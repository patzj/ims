import React from 'react';
import { connect } from 'react-redux';
import { itemNew, itemEdit } from '../../../actions/items-action';
import { closeItemModal } from '../../../actions/modal-action';

export class ItemForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        const name = typeof(this.props.currentItem) !== 'undefined' && typeof(this.props.currentItem.name) !== 'undefined' ? this.props.currentItem.name : '';
        const category = typeof(this.props.currentItem) !== 'undefined' && typeof(this.props.currentItem.category) !== 'undefined' ? this.props.currentItem.category : '';
        const quantity = typeof(this.props.currentItem) !== 'undefined' && typeof(this.props.currentItem.quantity) !== 'undefined' ? this.props.currentItem.quantity : 0;
        const price = typeof(this.props.currentItem) !== 'undefined' && typeof(this.props.currentItem.price) !== 'undefined' ? this.props.currentItem.price : 0;

        this.refs.name.value = name;
        this.refs.category.value = category;
        this.refs.quantity.value = quantity;
        this.refs.price.value = price;
    }

    render() {
        return (
            <form className="form-horizontal" method="post" onSubmit={e => this.props.handleSave(e)}>
                <div className="row form-group">
                    <label htmlFor="name" className="control-label col-md-4">Name</label>
                    <div className="col-md-8">
                        <input type="text"
                            className="form-control"
                            name="name"
                            ref="name"
                            required
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="category" className="control-label col-md-4">Category</label>
                    <div className="col-md-8">
                        <input type="text"
                            className="form-control"
                            name="category"
                            ref="category"
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="category" className="control-label col-md-4">Quantity</label>
                    <div className="col-md-8">
                        <input type="number"
                            className="form-control"
                            name="quantity"
                            min="0"
                            ref="quantity"
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="category" className="control-label col-md-4">Price</label>
                    <div className="col-md-8">
                        <input type="number"
                            className="form-control"
                            name="price"
                            min="0"
                            ref="price"
                        />
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
                        <button type="button" className="btn btn-warning" onClick={() => this.props.handleCancel()}>
                            <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};

let mapStateToProps = state => {
    return {
        currentItem: state.items.currentItem
    };
};

let mapDispatchToProps = dispatch => {
    return {
        handleSave: e => dispatch(itemNew(e)),
        handleCancel: () => dispatch(closeItemModal('#new-item-modal'))
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
        handleCancel: () => dispatch(closeItemModal('#edit-item-modal'))
    };
};

export const EditItemForm = connect(mapStateToProps, mapDispatchToProps)(ItemForm);
