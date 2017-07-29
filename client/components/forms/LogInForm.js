import React from 'react';

export const LogInForm = ({authError, handleSubmit}) => {
    return (
        <div
            id="log-in-form"
            className="container-fluid jumbotron col-xs-4 col-xs-offset-3 vcenter"
        >
            <header>
                <h1>
                    Inventory Management System
                </h1>
            </header>
            <form className="form-horizontal" onSubmit={e => handleSubmit(e)}>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="username"
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                    </span>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="password"
                    />
                </div>
                <button
                    type="submit"
                    className="form-control btn btn-primary btn-block"
                >
                    Log In
                </button>
                {
                    authError.length > 0 ?
                    <div id="auth-error" className="text-center alert alert-danger">{authError}</div> : ''
                }
            </form>
        </div>
    );
};

export default LogInForm;
