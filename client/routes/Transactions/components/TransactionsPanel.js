import React from 'react';
import TransactionsTable from '../containers/TransactionsTable';

export const TransactionsPanel = () => {
    return (
        <div className="col-xs-8 col-xs-offset-2">
            <h2>Transactions</h2>
            <TransactionsTable />
        </div>
    );
};

export default TransactionsPanel;
