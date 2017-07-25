import React from 'react'
import { connect } from 'react-redux';
import { itemDelete } from '../../../actions/items-action';

let ItemDeletePrompt = ({currentItem, yes, no}) => {
    return (
        <div className="row">
            <div className="row text-center">
                <p>Would you like to delete this item?</p>
            </div>
            <div className="col-md-6">
                <button className="btn btn-default btn-small btn-block btn-success" onClick={() => yes(currentItem.code)}>
                    <span className="glyphicon glyphicon-ok"></span>&nbsp;
                    Yes
                </button>
            </div>
            <div className="col-md-6">
                <button className="btn btn-default btn-small btn-block btn-danger" onClick={() => no()}>
                    <span className="glyphicon glyphicon-remove"></span>&nbsp;
                    No
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.items.currentItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        yes: code => dispatch(itemDelete(code)),
        no: () => $('#delete-item-modal').modal('hide')
    };
};

ItemDeletePrompt = connect(mapStateToProps, mapDispatchToProps)(ItemDeletePrompt);

export default ItemDeletePrompt;
