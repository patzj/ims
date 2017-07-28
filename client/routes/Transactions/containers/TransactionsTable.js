import React from 'react';

export class TransactionsTable extends React.Component {
    componentDidMount() {
        $('#transactions-table').DataTable({
            ajax: {
                url: '/api/transactions',
                dataSrc: 'transactions',
                beforeSend: function(req) {
                    const token = JSON.parse(localStorage.getItem('ims-user')).token;
                    req.setRequestHeader('x-access-token', token);
                }
            },
            columns: [
                {data: 'transactionType'},
                {data: 'itemCode'},
                {data: 'quantity'},
                {data: 'price'},
                {
                    data: null,
                    render: function(data) {
                        const d = new Date(data.transactionDate);
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
                    }
                }
            ]
        });
    }

    render() {
        return (
            <div>
                <table id="transactions-table" className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Item Code</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default TransactionsTable;
