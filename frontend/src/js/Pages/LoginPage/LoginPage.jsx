import React from 'react';

import Footer from '../../Containers/Footer/Footer';
import LoginForm from '../../Components/LoginForm/LoginForm';

import './LoginPage.scss'
import Header from '../../Containers/Header/Header';

function LoginPage({isMain}) {
    return (
            <>
                <Header isMain={ isMain }type={ 'login' } />
                <main className="container">
                    <LoginForm />
                </main>
            </>
        
    )
}

export default LoginPage;