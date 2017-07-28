const initialState = {
    currentItem: {},
    itemError: ''
};

export const itemsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_ITEM':
            return {
                ...state,
                currentItem: action.payload
            };
        case 'ITEM_ERROR':
            return {
                ...state,
                itemError: action.payload
            }
        default:
            return state;
    }
};

export default itemsReducer;
