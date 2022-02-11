import { push } from 'connected-react-router'
import ReactGA from 'react-ga';

export const login = (user) => {
    return function (dispatch) {
        fetch(`/api/v2/auth/login/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset="utf-8"'
            },
            body: JSON.stringify({ ...user })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 400) {
                dispatch({ type: 'FALSE_PASSWORD' })
                throw new Error('Password is incorrect')
            } else {
                throw new Error('Something went wrong on server')
            }
        }).then(data => {
            console.log(data);
            dispatch({ type: 'SIGN_IN', payload: data })
            ReactGA.set({ userId: data.user_id });
            window.ym(84678121, 'reachGoal', 'profile_success')
            dispatch(push('/'))
        }).catch(err => console.log(err))

    }
}

export const logout = () => {
    return function (dispatch) {
        ReactGA.set({ userId: null })
        dispatch({ type: 'SIGN_OUT' })
    }
}