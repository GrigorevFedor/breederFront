import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import MainPage from '../Pages/MainPage/MainPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import AccountSettings from '../Pages/AccountSettings/AccountSettings';
import KennelPage from '../Pages/KennelPage/KennelPage';
import AllAdsPage from '../Pages/AllAdsPage/AllAdsPage';
import AddNewAdPage from '../Pages/AddNewAdPage/AddNewAdPage';
import SingleAdPage from '../Pages/SingleAdPage/SingleAdPage';
import ArticlesPage from '../Pages/ArticlesPage/ArticlesPage'
import SingleArticlePage from '../Pages/SingleArticlePage/SingleArticlePage';


export const privateRoutes = [
    { path: '/lk-pitomnik', Component: AccountSettings },
    { path: '/novoe-obyavlenie', Component: AddNewAdPage },
];

export const publicRoutes = [
    { path: '/signup', Component: RegistrationPage },
    { path: '/signin', Component: LoginPage },
];

function usePageViews() {
    let location = useLocation()

    useEffect(
        () => {
            ReactGA.pageview([location.pathname])
        },
        [location]
    )
}

const Router = () => {
    usePageViews();
    const isLogged = useSelector(state => state.login.isLogged);
    return (

        <div className="wrapper">
            <Route key='/' exact={ true } path='/' >
                <MainPage isMain={ true } />
            </Route>
            <Route key='/obyavleniya' exact={ true } path='/obyavleniya' >
                <AllAdsPage isMain={ false } />
            </Route>
            <Route key='/pitomnik/:title/:id' path='/pitomnik/:title/:id' component={ KennelPage } />
            <Route key='/obyavleniya/:title/:id' path='/obyavleniya/:title/:id' component={ SingleAdPage } />
            <Route key='/blog' exact={ true } path='/blog' >
                <ArticlesPage isMain={ false } />
            </Route>
            <Route key='/blog/:title/:id' path='/blog/:title/:id' component={ SingleArticlePage } />
            { isLogged
                ? (
                    privateRoutes.map(({ path, Component, exact = false }) => (
                        <Route key={ path } exact={ exact } path={ path }>
                            <Component isMain={ false } />
                        </Route>
                    ))
                )
                : (
                    publicRoutes.map(({ path, Component, exact = false }) => (
                        <Route key={ path } exact={ exact } path={ path }>
                            <Component isMain={ false } />
                        </Route>
                    ))
                )
            }
        </div>
    )
}


export default Router;