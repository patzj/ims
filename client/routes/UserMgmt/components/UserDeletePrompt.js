import React from 'react'
import { connect } from 'react-redux';
import { userDelete } from '../../../actions/user-mgmt-action';
import { closeUserModal } from '../../../actions/modal-action';

let UserDeletePrompt = ({currentUser, yes, no}) => {
    return (
        <div className="row">
            <div className="row text-center">
                <p>Would you like to delete {currentUser.username}?</p>
            </div>
            <div className="col-md-6">
                <button className="btn btn-default btn-small btn-block btn-success" onClick={() => yes(currentUser.username)}>
                    <span className="glyphicon glyphicon-ok"></span>&nbsp;
                    Yes
                </button>
            </div>
            <div className="col-md-6">
                <button className="btn btn-default btn-small btn-block btn-danger" onClick={() => no()}>
                    <span className="glyphicon glyphicon-remove"></span>&nbsp;
                    No
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        yes: username => dispatch(userDelete(username)),
        no: () => dispatch(closeUserModal('#delete-user-modal'))
    };
};

UserDeletePrompt = connect(mapStateToProps, mapDispatchToProps)(UserDeletePrompt);

export default UserDeletePrompt;
