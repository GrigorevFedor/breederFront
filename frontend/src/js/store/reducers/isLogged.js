const loginStore = {
    userToken: null,
    isLogged: false,
    isFalsePassword: false
}

const loggedReducer = (state = loginStore, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                userToken: action.payload,
                isLogged: true,
                isFalsePassword: false
            }
        case 'SIGN_OUT':
            return {
                ...state,
                userToken: null,
                isLogged: false,
                isFalsePassword: false
            }
        case 'FALSE_PASSWORD':
            return {
                ...state,
                isFalsePassword: true
            }
        default:
            return state;
    }
};

export default loggedReducer;