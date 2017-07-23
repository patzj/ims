import React from 'react';
import { Modal, ModalHeader, ModalBody } from '../../../components/Modal';

export class ItemsTable extends React.Component {
    componentDidMount() {
        $('#items-table').DataTable({
            ajax: {
                url: '/api/items',
                dataSrc: 'items',
                beforeSend: function(req) {
                    const token = JSON.parse(localStorage.getItem('ims-user')).token;
                    req.setRequestHeader('x-access-token', token);
                }
            },
            columns: [
                {data: 'name'},
                {data: 'code'},
                {data: 'category'},
                {data: 'quantity'},
                {data: 'price'},
                {
                    data: null,
                    render: function(data) {
                        return '<button class="btn btn-success btn-xs in-item-btn" data-toggle="modal" data-target="#in-item-modal">' +
                            '<span class="glyphicon glyphicon-log-in"></span>' +
                        '</button>' +
                        '<button class="btn btn-warning btn-xs">' +
                            '<span class="glyphicon glyphicon-log-out"></span>' +
                        '</button>' +
                        '<button class="btn btn-default btn-xs">' +
                            '<span class="glyphicon glyphicon-pencil"></span>' +
                        '</button>' +
                        '<button class="btn btn-danger btn-xs">' +
                            '<span class="glyphicon glyphicon-remove"></span>' +
                        '</button>';
                    }
                }
            ]
        });
    }

    render() {
        return (
            <div>
                <table id="items-table" className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
                <Modal id="in-item-modal">
                    <ModalHeader>
                        <span className="close" data-dismiss="modal">&times;</span>
                        <h3>Incoming</h3>
                    </ModalHeader>
                    <ModalBody></ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ItemsTable;
