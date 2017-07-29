const initialState = {
    currentUser: {},
    userError: ''
};

export const userMgmtReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };
        case 'USER_ERROR':
            return {
                ...state,
                userError: action.payload
            };
        default:
            return state;
    }
};

export default userMgmtReducer;
