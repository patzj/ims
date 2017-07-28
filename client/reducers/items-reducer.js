const initialState = {
    currentItem: {}
};

export const itemsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_ITEM':
            return {
                ...state,
                currentItem: action.payload
            };
        default:
            return state;
    }
};

export default itemsReducer;
