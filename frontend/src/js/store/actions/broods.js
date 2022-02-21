export const initFilterParams = (filterParams) => ({
    type: 'INIT_FILTER_PARAMS',
    payload: filterParams,
})

export const setFilterValue = (name, value) => ({
    type: 'SET_FILTER_VALUE',
    payload: { name, value },
})

export const initFilterItems = (name) => ({
    type: 'INIT_FILTER_ITEMS',
    payload: name,
})

export const getBroods = () => async (dispatch) => {
    dispatch({ type: 'GET_BROODS_PENDING' })

    try {
        const response = await fetch(`/api/v2/announcements/?page=1`)
        if (!response.ok) {
            throw new Error(`error ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'GET_BROODS', payload: data })
    } catch (e) {
        dispatch({ type: 'GET_BROODS_FAILURE', payload: e.message });
    }
}

export const getFilteredBroods = (add = false) => async (dispatch, getState) => {
    const { filterParams, page } = getState().broods
    dispatch({ type: 'GET_BROODS_PENDING' })
    console.log(getState().broods.filterParams, getQueryParams(filterParams, page))
    try {
        let url = new URL(`${window.location.origin}/api/v2/announcements/`);
        url.search = new URLSearchParams(getQueryParams(filterParams, page));

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`error ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'SET_FILTERED_BROODS', payload: { data, add } })
    } catch (e) {
        dispatch({ type: 'GET_BROODS_FAILURE', payload: e.message });
    }
}

export const cancelFilter = (name) => ({
    type: 'CANCEL_FILTER',
    payload: name,
})

export const dafaultPage = () => ({
    type: 'DEFAULT_PAGE',

})

export const incrementPage = () => ({
    type: 'INCREMENT_PAGE',

})

const getQueryParams = (filterParams, page) => {
    let queryObj = {
        page: page
    }
    Object.keys(filterParams).forEach((key) => {
        if (filterParams[key].fetchServer) {
            if (filterParams[key].type == 'array') {
                if (filterParams[key].value.length > 0) {
                    queryObj[key] = filterParams[key].value
                }
            }
            if (filterParams[key].type == 'boolean') {
                if (filterParams[key].value == true) {
                    queryObj[key] = true
                }
            }
        }
    })
    return queryObj
}