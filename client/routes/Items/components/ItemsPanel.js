import React from 'react';
import ItemsTable from '../containers/ItemsTable';

export const ItemsPanel = () => {
    return (
        <div className="col-xs-8 col-xs-offset-2">
            <h2 className="pull-left">Items</h2>
            <div className="pull-right" style={{marginTop: '20px'}}>
                <button className="btn btn-success" data-toggle="modal" data-target="#new-item-modal">
                    <span className="glyphicon glyphicon-plus-sign"></span>&nbsp;New Item
                </button>
            </div>
            <ItemsTable />
        </div>
    );
};

export default ItemsPanel;
