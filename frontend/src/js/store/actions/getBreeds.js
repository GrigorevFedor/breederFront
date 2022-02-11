export const getBreeds = () => {
    return function (dispatch) {
        fetch(`/api/v2/breeds/`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch({ type: 'GET_BREEDS', payload: data.records.map(breed => breed.name) });
            }).catch((error) => {
                console.error('Ошибка:', error)
            })
    }
}