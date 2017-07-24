import React from 'react';
import { connect } from 'react-redux';
import { itemIn } from '../../../actions/items-action';

let ItemInForm = ({currentItem, itemIn}) => {
    return (
        <form className="form-horizontal" method="post" action="#" onSubmit={e => itemIn(currentItem.code, e)}>
            <div className="row">
                <label htmlFor="quantity" className="control-label col-md-3">Quantity</label>
                <div className="col-md-5">
                    <input type="number" name="quantity" min="0" max="999" className="form-control input-sm" defaultValue="0" />
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-default btn-block btn-sm btn-success">Add</button>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.items.currentItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        itemIn: (code, e) => dispatch(itemIn(code, e))
    };
};

ItemInForm = connect(mapStateToProps, mapDispatchToProps)(ItemInForm);
export default ItemInForm;
