import React from 'react';
import { connect } from 'react-redux';
import ItemInForm from '../components/ItemInForm';
import ItemOutForm from '../components/ItemOutForm';
import { EditItemForm, NewItemForm } from '../components/ItemForm';
import ItemDeletePrompt from '../components/ItemDeletePrompt';
import { Modal, ModalHeader, ModalBody } from '../../../components/Modal';
import { setItem, setItemId, getItem } from '../../../actions/items-action';
import { closeItemModal } from '../../../actions/modal-action';

export class ItemsTable extends React.Component {
    componentDidUpdate() {
        $('#items-table').DataTable().ajax.reload();
    }

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
                        return '<button class="btn btn-success btn-xs in-item-btn">' +
                            '<span class="glyphicon glyphicon-log-in"></span>' +
                            '<input type="hidden" value="' + data.code + '" />' +
                        '</button>' +
                        '<button class="btn btn-warning btn-xs out-item-btn">' +
                            '<span class="glyphicon glyphicon-log-out"></span>' +
                            '<input type="hidden" value="' + data.code + '" />' +
                        '</button>' +
                        '<button class="btn btn-default btn-xs edit-item-btn">' +
                            '<span class="glyphicon glyphicon-pencil"></span>' +
                            '<input type="hidden" value="' + data.code + '" />' +
                        '</button>' +
                        '<button class="btn btn-danger btn-xs delete-item-btn">' +
                            '<span class="glyphicon glyphicon-remove"></span>' +
                            '<input type="hidden" value="' + data.code + '" />' +
                        '</button>';
                    }
                }
            ]
        });

        const getItem = id => {
            this.props.getItem(id);
        };

        $('#items-table tbody').on('click', 'button.in-item-btn', function() {
            const code = $(this).find('input').val();
            getItem(code);
            $('#in-item-modal').modal('show');
        });

        $('#items-table tbody').on('click', 'button.out-item-btn', function() {
            const code = $(this).find('input').val();
            getItem(code);
            $('#out-item-modal').modal('show');
        });

        $('#items-table tbody').on('click', 'button.edit-item-btn', function() {
            const code = $(this).find('input').val();
            getItem(code);
            $('#edit-item-modal').modal('show');
        });

        $('#items-table tbody').on('click', 'button.delete-item-btn', function() {
            const code = $(this).find('input').val();
            getItem(code);
            $('#delete-item-modal').modal('show');
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
                <Modal id="in-item-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeItemModal('#in-item-modal')}>&times;</span>
                        <h4>{this.props.currentItem.name}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <ItemInForm />
                    </ModalBody>
                </Modal>
                <Modal id="out-item-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeItemModal('#out-item-modal')}>&times;</span>
                        <h4>{this.props.currentItem.name}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <ItemOutForm />
                    </ModalBody>
                </Modal>
                <Modal id="edit-item-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeItemModal('#edit-item-modal')}>&times;</span>
                        <h4>{this.props.currentItem.name}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <EditItemForm />
                    </ModalBody>
                </Modal>
                <Modal id="delete-item-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeItemModal('#delete-item-modal')}>&times;</span>
                        <h4>{this.props.currentItem.name}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <ItemDeletePrompt />
                    </ModalBody>
                </Modal>
                <Modal id="new-item-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeItemModal('#new-item-modal')}>&times;</span>
                        <h4>New Item</h4>
                    </ModalHeader>
                    <ModalBody>
                        <NewItemForm />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentItem: state.items.currentItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setItem: obj => dispatch(setItem(obj)),
        getItem: id => dispatch(getItem(id)),
        closeItemModal: modal => dispatch(closeItemModal(modal))
    };
};

ItemsTable = connect(mapStateToProps, mapDispatchToProps)(ItemsTable);

export default ItemsTable;
