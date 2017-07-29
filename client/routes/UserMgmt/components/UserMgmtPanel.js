import React from 'react';
import UserMgmtTable from '../containers/UserMgmtTable';

export const UserMgmtPanel = () => {
    return (
        <div className="col-xs-10 col-xs-offset-1">
            <h2 className="pull-left">User Management</h2>
            <div className="pull-right" style={{marginTop: '20px'}}>
                <button className="btn btn-success">
                    <span className="glyphicon glyphicon-plus-sign"></span>&nbsp;New User
                </button>
            </div>
            <UserMgmtTable />
        </div>
    );
};

export default UserMgmtPanel;
