export const getArticles = () => {
    return function (dispatch) {
        fetch(`/api/v2/articles/`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch({ type: 'GET_ARTICLES', payload: data.records });
            }).catch((error) => {
                console.error('Ошибка:', error)
            })
    }
}