import React from 'react';
import HeaderInfo from '../../Components/HeaderInfo/HeaderInfo';
import Navbar from '../../Components/UI/navbar/Navbar';
import './Header.scss';

import { useSelector } from 'react-redux';

function Header({ isMain = false }) {
    const isLogged = useSelector(state => state.login.isLogged);
    return (
        <header className="header">
            <Navbar isMain={ isMain } isAuth={ isLogged } />
            { isMain && <HeaderInfo /> }
        </header>
    )
}

export default Header
