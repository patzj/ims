import axios from 'axios';

export const setItem = obj => {
    return {
        type: 'SET_CURRENT_ITEM',
        payload: obj
    };
};

export const getItem = id => dispatch => {
    axios.get('/api/items/' + id, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            dispatch(setItem(res.data));
        }
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);
        }
    });
};

export const itemIn = (code, e) => dispatch => {
    e.preventDefault();
    axios.post(`/api/items/${code}/in`,
        {
            quantity: parseInt(e.target.quantity.value)
        },
        {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
            }
        }
    ).then(res => {
        if(res) {
            dispatch({
                type: 'SET_CURRENT_ITEM',
                payload: {}
            });
            $('#in-item-modal').modal('hide');
        }
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);
        }
    });
};

export const itemOut = (code, e) => dispatch => {
    e.preventDefault();
    axios.post(`/api/items/${code}/out`,
        {
            quantity: parseInt(e.target.quantity.value)
        },
        {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
            }
        }
    ).then(res => {
        if(res) {
            dispatch({
                type: 'SET_CURRENT_ITEM',
                payload: {}
            });
            $('#out-item-modal').modal('hide');
        }
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);
        }
    });
};
