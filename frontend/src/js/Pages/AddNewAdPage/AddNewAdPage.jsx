import React from 'react';
import AdForm from '../../Components/AdForm/AdForm';
import Header from '../../Containers/Header/Header';
import './AddNewAdPage.scss';

function AddNewAdPage(isAuth, toggleAuth, isMain, isEdit = false) {
    return (
        <>
        <Header isMain={false} isAuth={isAuth} toggleAuth={toggleAuth} />

        <div className="add-ad__container container">
            <h1 className="add-ad__heading">
                {isEdit ? 'Редактировать объявление' : 'Создать объявление'}
            </h1>
            <AdForm />
        </div>

        </>
    )
}

export default AddNewAdPage;