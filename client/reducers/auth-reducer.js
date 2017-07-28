const initialState = {
    isAuthenticated: false,
    authError: ''
};

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...state,
                authError: '',
                isAuthenticated: true
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                authError: action.payload
            };
        case 'DE_AUTH':
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
};

export default authReducer;
