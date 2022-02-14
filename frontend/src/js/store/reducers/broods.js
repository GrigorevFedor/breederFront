import { InitialFilterParamsState } from '../../Components/AdsFilter/AdsFilterInitialState'
import { REQUEST_STATUS } from "../../constants";

const initialState = {
    broodsItems: [],
    filterParams: InitialFilterParamsState,
    currentFilterParams: {},
    filteredBroods: [],
    page: 1,
    request: {
        error: null,
        status: REQUEST_STATUS.IDLE
    },
    total: 0,
};

const broodsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_BROODS':

            return {
                ...state,
                broodsItems: payload.records,
                filteredBroods: payload.records,
                request: {
                    error: null,
                    status: REQUEST_STATUS.SUCCESS,
                },
                total: payload.total,
            };
        case 'GET_BROODS_PENDING':
            return {
                ...state,
                request: {
                    error: null,
                    status: REQUEST_STATUS.PENDING,
                },
            };
        case 'GET_BROODS_FAILURE':
            return {
                ...state,
                request: {
                    error: payload,
                    status: REQUEST_STATUS.FAILURE,
                },
            };

        case 'SET_FILTERED_BROODS':

            Object.keys(state.filterParams).forEach((key) => {
                if (!state.filterParams[key].fetchServer) {
                    payload.records = state.filterParams[key].filterCallback()(payload.records, state.filterParams[key].value)
                }
            })

            return {
                ...state,
                filteredBroods: [...state.filteredBroods, ...payload.records],
                request: {
                    ...state.request,
                    status: REQUEST_STATUS.SUCCESS,
                },
                currentFilterParams: state.filterParams,
                total: payload.total,
            };
        case 'INIT_FILTER_ITEMS':
            if (state.filterParams[payload].items) {
                return {
                    ...state,
                    filterParams: {
                        ...state.filterParams,
                        [payload]: {
                            ...state.filterParams[payload],
                            items: InitialFilterParamsState[payload].getItems()(state.broodsItems)
                        }
                    }
                }
            } else { return state }
        case 'SET_FILTER_VALUE':
            return {
                ...state,
                filterParams: {
                    ...state.filterParams,
                    [payload.name]: {
                        ...state.filterParams[payload.name],
                        value: payload.value
                    }
                }
            }
        case 'CANCEL_FILTER':
            let newValue = undefined
            switch (state.filterParams[payload].type) {
                case 'array':
                    newValue = []
                    break
                case 'boolean':
                    newValue = false
                    break
            }
            return {
                ...state,
                filterParams: {
                    ...state.filterParams,
                    [payload]: {
                        ...state.filterParams[payload],
                        value: newValue
                    }
                },
                currentFilterParams: {
                    ...state.filterParams,
                    [payload]: {
                        ...state.filterParams[payload],
                        value: newValue
                    }
                },
            }
        case 'INCREMENT_PAGE':
            return {
                ...state,
                page: state.page + 1
            }
        default:
            return state
    }
}

export default broodsReducer;