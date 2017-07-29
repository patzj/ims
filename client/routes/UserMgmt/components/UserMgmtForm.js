import React from 'react';
import { connect } from 'react-redux';
import { userNew, userEdit } from '../../../actions/user-mgmt-action';
import { closeUserModal } from '../../../actions/modal-action';

export class UserMgmtForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        const username = typeof(this.props.currentUser) !== 'undefined' && typeof(this.props.currentUser.username) !== 'undefined' ? this.props.currentUser.username : '';
        const name = typeof(this.props.currentUser) !== 'undefined' && typeof(this.props.currentUser.name) !== 'undefined' ? this.props.currentUser.name : '';
        const role = typeof(this.props.currentUser) !== 'undefined' && typeof(this.props.currentUser.role) !== 'undefined' ? this.props.currentUser.role : '';

        this.refs.username.value = username;
        this.refs.name.value = name;
        this.refs.role.value = role;
        this.refs.password.value = '';
        this.refs.cPassword.value = '';
    }

    render() {
        return (
            <form className="form-horizontal" method="post" onSubmit={e => this.props.handleSave(e)}>
                <div className="row form-group">
                    <label htmlFor="username" className="control-label col-md-4">Username</label>
                    <div className="col-md-8">
                        <input type="text"
                            className="form-control"
                            name="username"
                            ref="username"
                            required
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="name" className="control-label col-md-4">Name</label>
                    <div className="col-md-8">
                        <input type="text"
                            className="form-control"
                            name="name"
                            ref="name"
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="password" className="control-label col-md-4">Password</label>
                    <div className="col-md-8">
                        <input type="password"
                            className="form-control"
                            name="password"
                            ref="password"
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="cPassword" className="control-label col-md-4">Confirm Password</label>
                    <div className="col-md-8">
                        <input type="password"
                            className="form-control"
                            name="cPassword"
                            ref="cPassword"
                        />
                    </div>
                </div>
                <div className="row form-group">
                    <label htmlFor="role" className="control-label col-md-4">Role</label>
                    <div className="col-md-8">
                        <select className="form-control"
                            ref="role"
                            name="role"
                        >
                            <option value="INVENTORY MGR">INVENTORY MGR</option>
                            <option value="SYSTEM ADMIN">SYSTEM ADMIN</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-1 text-center">
                        <button type="submit" className="btn btn-success">
                            <span className="glyphicon glyphicon-save"></span>&nbsp;
                            Save
                        </button>
                    </div>
                    <div className="col-md-4 col-md-offset-1 text-center">
                        <button type="button" className="btn btn-warning" onClick={() => this.props.handleCancel()}>
                            <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

let mapStateToProps = state => {
    return {
        currentUser: state.users.currentUser
    };
};

let mapDispatchToProps = dispatch => {
    return {
        handleSave: e => dispatch(userNew(e)),
        handleCancel: () => dispatch(closeUserModal('#new-user-modal'))
    };
};

export const NewUserForm = connect(mapStateToProps, mapDispatchToProps)(UserMgmtForm);

mapDispatchToProps = dispatch => {
    return {
        handleSave: e => dispatch(userEdit(e)),
        handleCancel: () => dispatch(closeUserModal('#edit-user-modal'))
    };
};

export const EditUserForm = connect(mapStateToProps, mapDispatchToProps)(UserMgmtForm);
