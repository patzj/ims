import React from 'react'
import { connect } from 'react-redux';

export const ItemDeletePrompt = () => {
    return (
        <div className="row">
            <div className="row text-center">
                <p>Would you like to delete this item?</p>
            </div>
            <div className="col-md-6">
                <button className="btn btn-default btn-small btn-block btn-success">
                    <span className="glyphicon glyphicon-ok"></span>&nbsp;
                    Yes
                </button>
            </div>
            <div className="col-md-6">
                <button className="btn btn-default btn-small btn-block btn-danger">
                    <span className="glyphicon glyphicon-remove"></span>&nbsp;
                    No
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default ItemDeletePrompt;
