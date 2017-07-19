import axios from 'axios';

export const authenticate = (e) => (dispatch) => {
    e.preventDefault();
    axios.post('/api/log-in', {
        username: e.target.username.value,
        password: e.target.password.value
    }).then(res => {
        if(res) {
            localStorage.setItem('ims-user', JSON.stringify(res.data));
            dispatch({
                type: 'AUTH_SUCCESS'
            });
        } else {
            dispatch({
                type: 'AUTH_ERROR',
                payload: 'Not authorized'
            });
        }
    }).catch(err => {
        if(err.response && err.response.status === 400) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: err.response.data.message
            });
        }
    });
};

export const reAuthenticate = () => {
    return {
        type: 'AUTH_SUCCESS'
    };
};
