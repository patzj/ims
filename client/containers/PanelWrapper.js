import React from 'react';
import { connect } from 'react-redux';
import LogInForm from '../components/forms/LogInForm';
import { authenticate, reAuthenticate } from '../actions/auth-action';

class AuthRequiredWrapper extends React.Component {
    componentWillMount() {
        if(localStorage.getItem('ims-user') && !this.props.isAuthenticated) {
            this.props.reAuthenticate();
        }
    }

    render() {
        const component = this.props.isAuthenticated ?
            this.props.children :
            <LogInForm
                authError={this.props.authError}
                handleSubmit={e => this.props.handleSubmit(e)}
            />

        return component;
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reAuthenticate: () => dispatch(reAuthenticate()),
        handleSubmit: e => dispatch(authenticate(e))
    };
};

export const PanelWrapper =
    connect(mapStateToProps, mapDispatchToProps)(AuthRequiredWrapper);

export default PanelWrapper;
