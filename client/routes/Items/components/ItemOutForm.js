import React from 'react';
import { connect } from 'react-redux';
import { itemOut } from '../../../actions/items-action';

let ItemOutForm = ({currentItem, itemOut}) => {
    return (
        <form className="form-horizontal" method="post" action="#" onSubmit={e => itemOut(currentItem.code, e)}>
            <div className="row">
                <label htmlFor="quantity" className="control-label col-md-3">Quantity</label>
                <div className="col-md-5">
                    <input type="number" name="quantity" min="0" max="999" className="form-control input-sm" defaultValue="0" />
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-default btn-block btn-sm btn-warning">Deduct</button>
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
        itemOut: (code, e) => dispatch(itemOut(code, e))
    };
};

ItemOutForm = connect(mapStateToProps, mapDispatchToProps)(ItemOutForm);
export default ItemOutForm;
