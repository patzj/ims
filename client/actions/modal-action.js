export const closeItemModal = modal => dispatch => {
    dispatch({
        type: 'SET_CURRENT_ITEM',
        payload: {}
    });
    dispatch({
        type: 'ITEM_ERROR',
        payload: ''
    });
    $(modal).modal('hide');
};

export const closeUserModal = modal => dispatch => {
    dispatch({
        type: 'SET_CURRENT_USER',
        payload: {}
    });
    dispatch({
        type: 'USER_ERROR',
        payload: ''
    });
    $(modal).modal('hide');
};
