import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/user-mgmt-action';
import { deAuthenticate } from '../actions/auth-action';
import { Modal, ModalHeader, ModalBody } from '../components/Modal';
import { EditUserForm } from '../routes/UserMgmt/components/UserMgmtForm';
import { closeUserModal } from '../actions/modal-action';
import UserError from '../routes/UserMgmt/components/UserError';

export class Header extends React.Component {
    openUserForm(e) {
        e.preventDefault();
        this.props.getUser(JSON.parse(localStorage.getItem('ims-user')).username);
        $('#edit-user-modal').modal('show');
    }

    logOut() {
        localStorage.removeItem('ims-user');
        this.props.deAuthenticate();
    }

    render() {
        return (
            <header className="row" style={{marginTop: '10px'}}>
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="pull-right">
                        <a id="user-link" href="#" onClick={(e) => this.openUserForm(e)}>{JSON.parse(localStorage.getItem('ims-user')).username}</a>
                        <button className="btn btn-xs btn-success" onClick={() => this.logOut()}>Log Out</button>
                    </div>
                    <Modal id="edit-user-modal" size="modal-sm">
                        <ModalHeader>
                            <span className="close" onClick={() => this.props.closeUserModal('#edit-user-modal')}>&times;</span>&nbsp;
                            <h4>{this.props.currentUser.username}</h4>
                        </ModalHeader>
                        <ModalBody>
                            <EditUserForm />
                            <UserError />
                        </ModalBody>
                    </Modal>
                </div>
            </header>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        currentUser: state.users.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: username => dispatch(getUser(username)),
        deAuthenticate: () => dispatch(deAuthenticate()),
        closeUserModal: modal => dispatch(closeUserModal(modal))
    };
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
