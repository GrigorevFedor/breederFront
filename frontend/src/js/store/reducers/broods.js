const broods = [];

const broodsReducer = (state = broods, action) => {
    switch (action.type) {
        case 'GET_BROODS':
            return action.payload;
        case 'GET_FILTERED_BROODS':
            return action.payload;
        default:
            return state
    }
}

export default broodsReducer;