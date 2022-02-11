import React, {useState, useEffect} from 'react'
import AdCard from '../AdCard/AdCard'
import './AdsSettings.scss'
import { useSelector } from 'react-redux';


function AdsSettings({ broods, isKennel, getUser }) {

    return (
        <div className="acc-settings__profile">
            <h3 className="profile__heading">
                Мои объявления
            </h3>

            <div className="broods-container">
                { broods.map((brood) => {
                    return (
                        <AdCard
                            key={ `broodCard${Math.random()}` }
                            brood={ brood }
                            broodClass="userads_brood-card"
                            isKennel={ isKennel }
                            isDeletePosssible={ true }
                            getUser={ getUser }
                        />
                    )
                }) }
            </div>

        </div>
    )
}

export default AdsSettings
