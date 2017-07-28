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

export const itemDelete = code => dispatch => {
    axios.delete(`/api/items/${code}`, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            dispatch({
                type: 'SET_CURRENT_ITEM',
                payload: {}
            });
            $('#delete-item-modal').modal('hide');
        }
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);
        }
    });
};

export const itemNew = e => dispatch => {
    e.preventDefault();
    const data = e.target;
    axios.post('/api/items', {
        name: data.name.value,
        category: data.category.value.split(','),
        quantity: parseInt(data.quantity.value),
        price: parseFloat(data.price.value)
    },
    {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            dispatch({
                type: 'SET_CURRENT_ITEM',
                payload: {}
            });
            $('#new-item-modal').modal('hide');
        }
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);
        }
    });
};

export const itemEdit = e => (dispatch, getState) => {
    e.preventDefault();
    const data = {
        name: e.target.name.value,
        category: e.target.category.value.split(','),
        quantity: parseInt(e.target.quantity.value),
        price: parseFloat(e.target.price.value)
    };
    axios.patch(`/api/items/${getState().items.currentItem.code}`, data, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            dispatch({
                type: 'SET_CURRENT_ITEM',
                payload: {}
            });
        }
        $('#edit-item-modal').modal('hide');
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);
        }
    });
};
