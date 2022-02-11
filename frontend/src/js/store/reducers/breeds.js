const breeds = [];

const breedsReducer = (state = breeds, action) => {
    switch (action.type) {
        case 'GET_BREEDS':
            return action.payload;
        default:
            return state
    }
}

export default breedsReducer;