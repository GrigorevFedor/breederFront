import React, { useState, useEffect } from 'react'
import SettingsSidebar from '../../Components/SettingsSidebar/SettingsSidebar'
import SettingsContainer from '../../Containers/SettingsContainer/SettingsContainer'
import '../../../scss/App.scss'
import './AccountSettings.scss'
import Header from '../../Containers/Header/Header'
import { useSelector } from 'react-redux';

function AccountSettings({ isAuth, isMain }) {
    const userToken = useSelector(state => state.login.userToken);

    const [block, setBlock] = useState('profile');
    const [userInfo, setUserInfo] = useState([]);

    const getUser = (async () => {
        try {
            await fetch(`/api/v2/profile/kennel/`, {
                method: 'GET',
                headers: {
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setUserInfo(data);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    })

    useEffect(() => {
        getUser();
    }, []);

    const [broods, setBroods] = useState([]);

    const getBroods = (async () => {
        try {
            await fetch(`/api/v2/profile/announcements/`, {
                method: 'GET',
                headers: {
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setBroods(data.records);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    })

    useEffect(() => {
        getBroods();
    }, []);


    const updateUserInfo = (name, value) => {
        setUserInfo({ ...userInfo, [name]: value });
    }

    const toggleBlock = (value) => {
        setBlock(value);
    }

    return (
        <>
            <Header isMain={ isMain } isAuth={ isAuth } />
            <main className="container acc-settings_container">
                <h1 className="acc-settings__heading">Личный кабинет</h1>
                <div className="acc-settings_wrapper">
                    <SettingsSidebar toggleBlock={ toggleBlock } />
                    <SettingsContainer getUser={ getUser } broods={ broods } updateUserInfo={ updateUserInfo } user={ userInfo } block={ block } />
                </div>
            </main>
        </>
    )
}

export default AccountSettings
