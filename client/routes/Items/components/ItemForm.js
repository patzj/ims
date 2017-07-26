import React from 'react';
import { connect } from 'react-redux';
import { itemNew, itemEdit } from '../../../actions/items-action';

export const ItemForm = ({handleSave, handleCancel, currentItem}) => {
    return (
        <form className="form-horizontal" method="post" onSubmit={e => handleSave(e)}>
            <div className="row form-group">
                <label htmlFor="name" className="control-label col-md-4">Name</label>
                <div className="col-md-8">
                    <input type="text" className="form-control" name="name" defaultValue={typeof(currentItem) !== 'undefined' && typeof(currentItem.name) !== 'undefined' ? currentItem.name : ''} required />
                </div>
            </div>
            <div className="row form-group">
                <label htmlFor="category" className="control-label col-md-4">Category</label>
                <div className="col-md-8">
                    <input type="text" className="form-control" name="category" defaultValue={typeof(currentItem) !== 'undefined' && typeof(currentItem.category) !== 'undefined' ? currentItem.category : ''} />
                </div>
            </div>
            <div className="row form-group">
                <label htmlFor="category" className="control-label col-md-4">Quantity</label>
                <div className="col-md-8">
                    <input type="number" className="form-control" name="quantity" min="0" defaultValue={typeof(currentItem) !== 'undefined' && typeof(currentItem.quantity) !== 'undefined' ? currentItem.quantity : 0} />
                </div>
            </div>
            <div className="row form-group">
                <label htmlFor="category" className="control-label col-md-4">Price</label>
                <div className="col-md-8">
                    <input type="number" className="form-control" name="price" min="0" defaultValue={typeof(currentItem) !== 'undefined' && typeof(currentItem.price) !== 'undefined' ? currentItem.price : 0} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-1 text-center">
                    <button type="submit" className="btn btn-success">
                        <span className="glyphicon glyphicon-save"></span>&nbsp;
                        Save
                    </button>
                </div>
                <div className="col-md-4 col-md-offset-1 text-center">
                    <button type="button" className="btn btn-warning" onClick={() => handleCancel()}>
                        <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

let mapStateToProps = state => {
    return {
        currentItem: {}
    };
};

let mapDispatchToProps = dispatch => {
    return {
        handleSave: e => dispatch(itemNew(e)),
        handleCancel: () => $('#new-item-modal').modal('hide')
    };
};

export const NewItemForm = connect(mapStateToProps, mapDispatchToProps)(ItemForm);

mapStateToProps = state => {
    return {
        currentItem: state.items.currentItem
    };
};

mapDispatchToProps = (dispatch) => {
    return {
        handleSave: e => dispatch(itemEdit(e)),
        handleCancel: () => $('#edit-item-modal').modal('hide')
    };
};

export const EditItemForm = connect(mapStateToProps, mapDispatchToProps)(ItemForm);
