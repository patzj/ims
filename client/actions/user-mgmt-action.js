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
