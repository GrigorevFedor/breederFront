import React, { useState, useEffect } from 'react';
import './SingleAdCard.scss';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import ConfirmingModal from '../../Containers/ConfirmingModal/ConfirmingModal';
import translit from '../../utils/translit';
import { useSelector } from 'react-redux';

function SingleAdCard({ id, isLogged, brood }) {
    const history = useHistory();
    const [isDeletePossible, setIsDeletePossible] = useState(false);
    const [kennelTranslit, setKennelTranslit] = useState('');
    const [kennelID, setKennelID] = useState('');

    const userToken = useSelector(state => state.login.userToken);

    const getKennelID = async () => {
        try {
            await fetch(`/api/v2/profile/kennel/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"',
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    if (data.id) {
                        setKennelID(data.id)
                    };
                });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        async function getKennel() {
            await getKennelID();
            try {
                await fetch(`/api/v2/kennel/${brood.kennel.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset="utf-8"',
                    }
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        let title = translit(data.title);
                        setKennelTranslit(title);
                        kennelID === brood.kennel.id ? setIsDeletePossible(true) : setIsDeletePossible(false);
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getKennel();
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [modalAnswerOpen, setModalAnswerOpen] = useState(false);

    const handleDeleteClick = async (e) => {
        history.replace('/obyavleniya');
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
                        setTimeout(() => {
                            setModalAnswerOpen(true);
                            setIsSuccess(true);
                            history.push(`/obyavleniya`);
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
            { isDeletePossible && <button onClick={ () => setModalOpen(true) } name="delete" className="brood_delete" >
                <span className="delete-text">Удалить</span>
                <i className="fas delete-icon fa-times"></i>
            </button>
            }
            <h1 className="single-ad__heading">{ (() => {
                let arr = brood.title.split('');
                arr[0] = arr[0].toUpperCase();
                return arr.join('');
            })()
            }</h1>
            <p className="creation-date">Опубликовано { new Date(brood.created_at).toLocaleDateString() }</p>

            <section className="modal-card__container">
                <div className="info-block_container">

                    <div className="imgs-container">
                        <div className="imgs-container">
                            { brood.pet_photos === null || brood.pet_photos.length === 0
                                ? <img alt='' src="/img/image-placeholder.jpg" className="placeholder" />
                                : brood.pet_photos.map(photo => {
                                    return (
                                        <img alt='' key={ `${brood.id}${Math.random()}` } src={ photo.image } className={ `brood__img ${photo.image === brood.pet_photos[0].image && 'large-img'}` } onClick={ e => {
                                            document.querySelectorAll('.brood__img').forEach(img => img.classList.remove('large-img'));
                                            e.target.classList.add('large-img');
                                        } } />
                                    )
                                }) }
                        </div>
                    </div>

                    <div className="info-container">
                        <h2 className="kennel-name">{ brood.kennel.title }</h2>

                        <span className="kennel-approve">Питомник на проверке</span>

                        <span className='card-divider-line'></span>

                        <p className='kennel-contacts'><a href={ `tel:${brood.kennel.phone}` }>{ brood.kennel.phone }</a></p>
                        <p className='kennel-contacts'><a href={ `mailto:${brood.kennel.email}` }>{ brood.kennel.email }</a></p>

                        <span className='card-divider-line'></span>

                        <p className="breed">{ brood.breed }</p>

                        <div className="sex-container">
                            <div className="sex-text">Пол</div>
                            <div className="male-count">
                                <i className="fas male-icon fa-mars"></i>
                                { brood.male_count }
                            </div>
                            <div className="female-count">
                                <i className="fas female-icon fa-venus"></i>
                                { brood.female_count }
                            </div>
                            <div className="code">{ `Код id_dog${brood.id}` }</div>
                        </div>

                        <div className="date-of-birth_block">
                            <span>Дата рождения</span>
                            <span>{ new Date(brood.birthday).toLocaleDateString() }</span>
                        </div>

                        <span className='card-divider-line'></span>

                        <div className="price_block">
                            <span>Цена</span>
                            <span>{ String(brood.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ") } &#8381;</span>
                        </div>

                        { brood.with_documents ? (
                            <span className="brood-documents" style={ { color: '#4DC880' } }>С родословной</span>
                        ) : (
                            <span className="brood-documents" style={ { color: '#FD4447' } }>Без родословной</span>
                        ) }

                        <span className='card-divider-line'></span>

                        <div className="city">{ brood.city }</div>

                        { brood.is_transportable ? (
                            <span className="transportable"><span style={ { color: '#4DC880' } }>Возможна</span> отправка в другой город</span>
                        ) : (
                            <span className="transportable">Отправка в другой город <span style={ { color: '#FD4447' } }>невозможна</span></span>
                        ) }

                    </div>
                </div>

                { brood.description.length !== 0 && <div className="about-brood_block">
                    <h3 className="about-brood_heading">О помете</h3>
                    <p className="brood-description">
                        { brood.description }
                    </p>
                </div> }

                { (brood.parents_description.length !== 0 && brood.parent_photos !== null) && <div className="parents_block">
                    <h3 className="parents_heading">О родителях щенков</h3>

                    <div className="parents_container">
                        { brood.parent_photos !== null && <div className="parents_photos">
                            { brood.parent_photos.map((photo) => {
                                return (
                                    <div className="parent_photo_container">
                                        <img key={ `${Math.random()}` } className="parent_photo" alt="" src={ photo.image } />
                                    </div>
                                )
                            }) }
                        </div> }

                        { brood.parents_description.length !== 0 && <p className="parents-description">
                            { brood.parents_description }
                        </p> }
                    </div>
                </div> }



                <Link
                    to={ `/pitomnik/${kennelTranslit}/${brood.kennel.id}` }
                    onClick={ () => history.push(`/pitomnik/${kennelTranslit}/${brood.kennel.id}`) }
                >
                    <div className="pr-filled-btn brood-card-btn">О питомнике</div>
                </Link>


            </section>

        </>
    )
}

export default SingleAdCard;