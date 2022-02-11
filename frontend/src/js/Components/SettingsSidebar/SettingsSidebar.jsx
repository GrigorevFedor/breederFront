import React from 'react'
import './SettingsSidebar.scss'

function SettingsSidebar({toggleBlock}) {

    const handleClick = (e) => {
        toggleBlock(e.currentTarget.id);
    }

    return (
        <>
        <div className="acc-settings__sidebar">
            <input className="sidebar__input" type="radio" id="profile" name="sidebar" onClick={e => handleClick(e)} />
            <label htmlFor="profile" className="sidebar__label">
                Профиль
            </label>

            <input className="sidebar__input" type="radio" id="kennel" name="sidebar" onClick={e => handleClick(e)} />
            <label htmlFor="kennel" className="sidebar__label">
                Питомник
            </label>

            <input className="sidebar__input" type="radio" id="ads" name="sidebar" onClick={e => handleClick(e)} />
            <label htmlFor="ads" className="sidebar__label">
                Объявления
            </label>
        </div>
        </>
    )
}

export default SettingsSidebar
