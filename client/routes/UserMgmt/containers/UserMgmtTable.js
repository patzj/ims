import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from '../../../components/Modal';
import { getUser } from '../../../actions/user-mgmt-action';
import { closeUserModal } from '../../../actions/modal-action';
import { deAuthenticate } from '../../../actions/auth-action';
import { NewUserForm, EditUserForm } from '../components/UserMgmtForm';
import UserError from '../components/UserError';

export class UserMgmtTable extends React.Component {
    componentDidUpdate() {
        $('#user-mgmt-table').DataTable().ajax.reload();
    }

    componentDidMount() {
        $('#user-mgmt-table').DataTable({
            ajax: {
                url: '/api/users',
                dataSrc: 'users',
                beforeSend: function(req) {
                    const token = JSON.parse(localStorage.getItem('ims-user')).token;
                    req.setRequestHeader('x-access-token', token);
                },
                error: function(xhr, error, thrown) {
                    if(xhr.status === 403) {
                        this.props.deAuthenticate();
                    }
                }.bind(this)
            },
            columns: [
                {data: 'username'},
                {data: 'name'},
                {data: 'role'},
                {
                    data: null,
                    render: function(data) {
                        return '<button class="btn btn-default btn-xs edit-user-btn">' +
                            '<span class="glyphicon glyphicon-pencil"></span>' +
                            '<input type="hidden" value="' + data.username + '" />' +
                        '</button>' +
                        '<button class="btn btn-danger btn-xs delete-user-btn">' +
                            '<span class="glyphicon glyphicon-remove"></span>' +
                            '<input type="hidden" value="' + data.username + '" />' +
                        '</button>';
                    }
                }
            ]
        });

        const getUser = username => {
            this.props.getUser(username);
        };

        $('#user-mgmt-table').on('click', 'button.edit-user-btn', function() {
            const username = $(this).find('input').val();
            getUser(username);
            $('#edit-user-modal').modal('show');
        });

        $('#user-mgmt-table').on('click', 'button.delete-user-btn', function() {
            const username = $(this).find('input').val();
            getUser(username);
            $('#delete-user-modal').modal('show');
        });
    }

    render() {
        return (
            <div>
                <table id="user-mgmt-table" className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
                <Modal id="edit-user-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeUserModal('#edit-user-modal')}>&times;</span>
                        <h4>{this.props.currentUser.username}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <EditUserForm />
                        <UserError />
                    </ModalBody>
                </Modal>
                <Modal id="delete-user-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeUserModal('#delete-user-modal')}>&times;</span>
                        <h4>{this.props.currentUser.username}</h4>
                    </ModalHeader>
                    <ModalBody>
                        Delete
                    </ModalBody>
                </Modal>
                <Modal id="new-user-modal" size="modal-sm">
                    <ModalHeader>
                        <span className="close" onClick={() => this.props.closeItemModal('#new-item-modal')}>&times;</span>
                        <h4>New User</h4>
                    </ModalHeader>
                    <ModalBody>
                        <NewUserForm />
                        <UserError />
                    </ModalBody>
                </Modal>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        currentUser: state.users.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: username => dispatch(getUser(username)),
        closeUserModal: modal => dispatch(closeUserModal(modal)),
        deAuthenticate: () => dispatch(deAuthenticate())
    };
};

UserMgmtTable = connect(mapStateToProps, mapDispatchToProps)(UserMgmtTable);

export default UserMgmtTable;
