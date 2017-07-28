import React from 'react';
import { connect } from 'react-redux';

let ItemError = ({itemError}) => {
    return (
        <div className="text-center" id="item-error">
            {
                itemError.length > 0 ?
                <p className="alert-danger">{itemError}</p> :
                ''
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        itemError: state.items.itemError
    };
};

ItemError = connect(mapStateToProps)(ItemError);
export default ItemError;
