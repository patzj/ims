import axios from 'axios';

export const setUser = obj => {
    return {
        type: 'SET_CURRENT_USER',
        payload: obj
    };
};

export const getUser = username => dispatch => {
    axios.get('/api/users/' + username, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            dispatch(setUser(res.data));
        }
        dispatch({
            type: 'USER_ERROR',
            payload: ''
        });

    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);

            if(err.response.status === 403) {
                dispatch({type: 'DE_AUTH'});
            } else {
                dispatch({
                    type: 'USER_ERROR',
                    payload: err.response.data.message
                });
            }
        }
    });
};

export const userNew = e => dispatch => {
    e.preventDefault();
    const data = e.target;
    if(data.password.value.length === 0) {
        dispatch({
            type: 'USER_ERROR',
            payload: 'Please enter a password'
        });
    } else if(data.password.value !== data.cPassword.value) {
        dispatch({
            type: 'USER_ERROR',
            payload: 'Passwords do not match'
        })
    } else {
        axios.post('/api/users', {
            username: data.username.value,
            name: data.name.value,
            password: data.password.value,
            role: data.role.value
        },
        {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
            }
        }).then(res => {
            if(res) {
                dispatch(setUser({}));
            }
            dispatch({
                type: 'USER_ERROR',
                payload: ''
            });
            $('#new-user-modal').modal('hide');
        }).catch(err => {
            if(err.response && err.response.status >= 400) {
                console.log(err.response.data.message);

                if(err.response.status === 403) {
                    dispatch({type: 'DE_AUTH'});
                } else {
                    dispatch({
                        type: 'USER_ERROR',
                        payload: err.response.data.message
                    });
                }
            }
        });
    }
};

export const userEdit = e => (dispatch, getState) => {
    e.preventDefault();
    const data = {
        username: e.target.username.value,
        name: e.target.name.value,
        role: e.target.role.value
    };
    if(e.target.password.value !== e.target.cPassword.value) {
        dispatch({
            type: 'USER_ERROR',
            payload: 'Passwords do not match'
        });
    } else {
        if(e.target.password.value.length > 0) {
            data.password = e.target.password.value;
        }

        axios.patch(`/api/users/${getState().users.currentUser.username}`, data, {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
            }
        }).then(res => {
            if(res) {
                dispatch(setUser({}))
            }
            dispatch({
                type: 'USER_ERROR',
                payload: ''
            });
            $('#edit-user-modal').modal('hide');
        }).catch(err => {
            if(err.response && err.response.status >= 400) {
                console.log(err.response.data.message);

                if(err.response.status === 403) {
                    dispatch({type: 'DE_AUTH'});
                } else {
                    dispatch({
                        type: 'USER_ERROR',
                        payload: err.response.data.message
                    });
                }
            }
        });
    }
};

export const userDelete = username => dispatch => {
    axios.delete(`/api/users/${username}`, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            dispatch(setUser({}));
        }
        dispatch({
            type: 'USER_ERROR',
            payload: ''
        });
        $('#delete-user-modal').modal('hide');
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);

            if(err.response.status === 403) {
                dispatch({type: 'DE_AUTH'});
            } else {
                dispatch({
                    type: 'USER_ERROR',
                    payload: err.response.data.message
                });
            }
        }
    });
}
