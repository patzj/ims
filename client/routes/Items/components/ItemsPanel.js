import React from 'react';
import ItemsTable from '../containers/ItemsTable';

export const ItemsPanel = () => {
    return (
        <div className="col-xs-8 col-xs-offset-2">
            <h2>Items</h2>
            <ItemsTable />
        </div>
    );
};

export default ItemsPanel;
