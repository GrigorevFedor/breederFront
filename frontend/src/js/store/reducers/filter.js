import { InitialState } from '../../Components/AdsFilter/AdsFilterInitialState'

const filterParamsInitialState = InitialState;

const filterReducer = (state = filterParamsInitialState, action) => {
    switch (action.type) {
        case 'SET_FILTER_PARAMS':
            return {
                ...state,
                filteredParams: action.payload,
            };
        default:
            return state
    }
}

export default filterReducer;