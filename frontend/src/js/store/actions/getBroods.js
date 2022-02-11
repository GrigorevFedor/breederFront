export const getBroods = () => {
    return function (dispatch) {
        fetch(`/api/v2/announcements/?page=1`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({ type: 'GET_BROODS', payload: [...data.records] })
                // console.log('getBroods called')
                // setBroods([...data.records]);
                // setLoaded(true);
                // setFilteredBroods([...data.records])
                // // return [...data.records]
            }).catch((error) => {
                console.error('Ошибка:', error)
            })
    }
}

export const getFilteredBroods = () => {
    return function (dispatch) {
        fetch(`/api/v2/announcements/` + getQueryParams())
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({ type: 'GET_FILTERED_BROODS', payload: [...data.records] })
            }).catch((error) => {
                console.error('Ошибка:', error)
            })
    }
}

const getQueryParams = () => {
    let queryString = ''
    Object.keys(filterParams).forEach((key) => {
        if (filterParams[key].fetchServer) {
            if (filterParams[key].type == 'array') {
                if (filterParams[key].value.length > 0) {
                    queryString += '&'
                    queryString += `${key}=`
                    filterParams[key].value.forEach((valueItem) => {
                        queryString += (valueItem + '%')
                    })
                    queryString = queryString.slice(0, -1)
                }
            }
            if (filterParams[key].type == 'boolean') {
                if (filterParams[key].value == true) {
                    queryString += '&'
                    queryString += (key + '=true')
                }
            }
        }
    })
    return `?page=${page}${queryString}`
}