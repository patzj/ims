import React from 'react';
import { connect } from 'react-redux';

let UserError = ({userError}) => {
    return (
        <div className="text-center" id="item-error">
            {
                userError.length > 0 ?
                <p className="alert-danger">{userError}</p> :
                ''
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userError: state.users.userError
    };
};

UserError = connect(mapStateToProps)(UserError);
export default UserError;
