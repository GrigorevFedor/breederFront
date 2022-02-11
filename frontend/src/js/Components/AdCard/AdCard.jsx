import React, { useState } from 'react';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import ConfirmingModal from '../../Containers/ConfirmingModal/ConfirmingModal';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import './AdCard.scss';
import Button from '../UI/button/Button';
import { useSelector } from 'react-redux';
import translit from '../../utils/translit';

function AdCard({ brood, broodClass, isKennel, isDeletePosssible, getBroods }) {
    const userToken = useSelector(state => state.login.userToken);
    const { breed, pet_photos, city, birthday, documents } = brood;
    const history = useHistory();

    const [modalOpen, setModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [modalAnswerOpen, setModalAnswerOpen] = useState(false);

    const handleDeleteClick = async (e) => {
        try {
            await fetch(`/api/v2/announcements/${brood.id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"',
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then(res => {
                    if (res.ok) {
                        getBroods();
                        setTimeout(() => {
                            setModalAnswerOpen(true);
                            setIsSuccess(true);
                        }, 3000);
                    } else {
                        setModalAnswerOpen(true);
                        setIsSuccess(false);
                    }
                });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    return (
        <>
            <SubmittingModal open={ modalAnswerOpen } onClose={ () => setModalAnswerOpen(false) } title={ isSuccess ? 'Объявление удалено.' : 'Упс! Что-то пошло не так' } text={ isSuccess ? '' : 'Попробуйте еще раз' } path='/' isSubmit={ false } />
            <ConfirmingModal open={ modalOpen } onClose={ () => setModalOpen(false) } onDelete={ () => handleDeleteClick() } modalClass='modal-small' path='/' />

            <div className={ `brood-card brood-card_desktop ${broodClass}` }>
                { isDeletePosssible && <button onClick={ () => setModalOpen(true) } name="delete" className="brood_delete" >
                    <i className="fas edit-icon fa-times"></i>
                </button> }

                <div className="brood-card__img-container">
                    <img className="brood-card__img" alt={ breed.name } src={ pet_photos === null || pet_photos.length === 0 ? "/img/image-placeholder.jpg" : pet_photos[0].image } />
                </div>

                <Link
                    to={ `/obyavleniya/${translit(brood.title)}/${brood.id}` }
                    brood={ brood }
                    onClick={ () => history.push(`/obyavleniya/${translit(brood.title)}/${brood.id}`) }
                    id={ brood.id }
                >
                    <div className="brood-card__info">
                        <div>
                            <h5 className="brood-card__name" style={ { fontWeight: '500' } }>{ (() => {
                                let arr = brood.title.split('');
                                arr[0] = arr[0].toUpperCase();
                                return arr.join('');
                            })()
                            }</h5>

                            <p className="brood-card__city">{ city }</p>
                            <p className="brood-card__date-of-birth">{ new Date(birthday).toLocaleDateString() }</p>
                            <span className="kennel-approve">Питомник на проверке</span>
                        </div>
                        <Button
                            btnClass='brood-card__btn brood-card__btn_text'
                            id={ brood.id }
                            text='Подробнее'
                            isLink={ true }
                            path={ `/obyavleniya/${translit(brood.title)}/${brood.id}` }
                            brood={ brood }
                            onClick={ () => history.push(`/obyavleniya/${translit(brood.title)}/${brood.id}`) }
                        />
                    </div>
                </Link>
            </div>

            <div className={ `brood-card ${broodClass} brood-card-mobile` } name="mobile-delete" >
                { isDeletePosssible && <button className="brood_delete" name="delete" onClick={ () => setModalOpen(true) }>
                    <i className="fas edit-icon fa-times"></i>
                </button> }
                <div className="brood-card_mobile_img-block">

                    <div className="brood-card__img-container">
                        <img className="brood-card__img" alt={ breed.name } src={ pet_photos === null || pet_photos.length === 0 ? "/img/image-placeholder.jpg" : pet_photos[0].image } />
                    </div>

                    <div className="brood-card__info-mobile-block">
                        { documents ? (
                            <span className="documents">С документами</span>
                        ) : (
                            <span className="documents">Без документов</span>
                        ) }

                    </div>
                </div>

                <Link
                    to={ `/obyavleniya/${translit(brood.title)}/${brood.id}` }
                    brood={ brood }
                    onClick={ () => history.push(`/obyavleniya/${translit(brood.title)}/${brood.id}`) }
                    id={ brood.id }
                >

                    <div className="brood-card__info">
                        <h5 className="brood-card__name" style={ { fontWeight: '500' } }>{ (() => {
                            let arr = brood.title.split('');
                            arr[0] = arr[0].toUpperCase();
                            return arr.join('');
                        })()
                        }</h5>

                        <p className="brood-card__city">{ city }</p>
                        <p className="brood-card__date-of-birth">{ new Date(birthday).toLocaleDateString() }</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default AdCard;