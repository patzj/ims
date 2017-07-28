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
