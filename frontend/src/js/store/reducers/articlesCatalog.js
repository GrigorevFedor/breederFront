const articles = [];

const articlesReducer = (state = articles, action) => {
    switch (action.type) {
        case 'GET_ARTICLES':
            return action.payload;
        default:
            return state
    }
}

export default articlesReducer;