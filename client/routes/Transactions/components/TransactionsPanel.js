import React from 'react';
import TransactionsTable from '../containers/TransactionsTable';

export const TransactionsPanel = () => {
    return (
        <div className="col-xs-10 col-xs-offset-1">
            <h2>Transactions</h2>
            <TransactionsTable />
        </div>
    );
};

export default TransactionsPanel;
