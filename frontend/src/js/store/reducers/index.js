import loggedReducer from './isLogged';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import breedsReducer from './breeds';
import articlesReducer from './articlesCatalog'
import broodsReducer from './broods'
import filterReducer from './filter'
// import kennelProfileReducer from './kennelProfile';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    login: loggedReducer,
    breeds: breedsReducer,
    articles: articlesReducer,
    broods: broodsReducer,
    filter: filterReducer,
    // kennelProfile: kennelProfileReducer
});

export default rootReducer;