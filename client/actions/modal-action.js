export const closeItemModal = modal => dispatch => {
    dispatch({
        type: 'SET_CURRENT_ITEM',
        payload: {}
    });
    $(modal).modal('hide');
};
