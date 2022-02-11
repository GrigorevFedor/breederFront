import React, { useState, useEffect } from 'react'
import InputField from '../UI/input/Input'
import TooltipArrow from '../UI/popup/TooltipArrow'
import './KennelSettings.scss';
import '../ProfileSettings/ProfileSettings.scss';
import TextArea from '../UI/textarea/TextArea';
import Button from '../UI/button/Button';
import { useHistory } from 'react-router';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import { nameValidation, phoneValidation, emailValidation } from '../../utils/validation'
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import ConfirmingModal from '../../Containers/ConfirmingModal/ConfirmingModal';
import { makeStyles } from '@material-ui/core/styles';
import getBase64 from '../../utils/getBase64';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));

function KennelSettings() {
    const userToken = useSelector(state => state.login.userToken);

    const history = useHistory();
    const classes = useStyles();

    const [kennelPhoto, setKennelPhoto] = useState('');
    const [kennel, setKennel] = useState('');
    const [breeds, setBreeds] = useState([]);

    const getKennel = async () => {
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
                    setKennel({ ...data });
                    setKennelPhoto(data.photo)
                    formatBreeds();
                })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getKennel();
    }, []);

    const [disabled, setDisabled] = useState({
        kennelName: true,
        userName: true,
        kennelEmail: true,
        // breeds: true,
        userPhone: true,
        kennelDescription: true
    });
    const [dataToUpdate, setDataToUpdate] = useState({
        kennelName: kennel.title,
        userName: kennel.owner_name,
        kennelEmail: kennel.email,
        // breeds: kennel.breeds,
        userPhone: kennel.phone,
        kennelDescription: kennel.description
    })
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => { }, [dataToUpdate]);

    useEffect(
        () => { },
        [errors]
    );

    const formatBreeds = () => {
        const breeds = [];
        kennel.breeds.map(breed => {
            breeds.push(breed.breed);
        });
        setBreeds(breeds);
    }

    const updateKennelData = async () => {
        try {
            await fetch(`/api/v2/profile/kennel/`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: dataToUpdate.kennelName,
                    owner_name: dataToUpdate.userName,
                    phone: dataToUpdate.userPhone,
                    email: dataToUpdate.kennelEmail,
                    // breeds: [...dataToUpdate.breeds],
                    description: dataToUpdate.kennelDescription
                }),
                headers: {
                    "accepts": "application/json",
                    'Content-Type': 'application/json; charset="utf-8"',
                    'Authorization': userToken.access_token.toString()
                }
            }).then((res) => {
                if (res.ok) {
                    setModalOpen(true);
                    setIsSuccess(true);
                    getKennel();
                    setTimeout(() => history.push('/lk-pitomnik'), 3000);
                    console.log(dataToUpdate);
                    setDisabled({
                        kennelName: true,
                        userName: true,
                        kennelEmail: true,
                        breeds: true,
                        userPhone: true,
                        kennelDescription: true
                    });
                } else {
                    setModalOpen(true)
                    setIsSuccess(false)
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }

    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDataToUpdate({ ...dataToUpdate, [name]: value });
        setTouched({
            ...touched,
            [name]: true
        });
    };
    const handleBlur = evt => {
        const { name, value } = evt.target;

        // remove whatever error was there previously
        const { [name]: removedError, ...rest } = errors;

        // check for a new error
        const error = validate[name](value);

        // // validate the field if the value has been touched
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error })
        });
    };

    const validate = {
        kennelName: name => nameValidation("User Name", name),
        userName: name => nameValidation("User Name", name),
        kennelEmail: emailValidation,
        userPhone: phoneValidation,
    };
    const isEmptyObj = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        updateKennelData();

        if (isEmptyObj(errors) && !isEmptyObj(touched)) {
            updateKennelData();

        } else {
            console.log('Введите корректные данные');
        }
    }

    const updateKennelPhoto = async (file) => {
        try {
            await fetch(`/api/v2/profile/kennel/photo/`, {
                method: 'PUT',
                body: JSON.stringify({
                    photo: file,
                }),
                headers: {
                    'Authorization': userToken.access_token.toString(),
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setModalOpen(true);
                    setIsSuccess(true);
                    setTimeout(() => history.push('/lk-pitomnik'), 3000);
                    getKennel();
                } else {
                    setModalOpen(true);
                    setIsSuccess(false);
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await fetch(`/api/v2/profile/kennel/photo/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': userToken.access_token.toString(),
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            })
                .then(res => {
                    if (res.ok) {
                        setModalConfirmOpen(false);
                        setModalOpen(true);
                        setIsDeleteSuccess(true);
                        setKennelPhoto('');
                        getKennel();
                    } else {
                        setModalOpen(true);
                        setIsDeleteSuccess(false);
                    }
                })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const handleAvatarClick = (e) => {
        let photo = e.target.files[0];
        getBase64(photo).then(
            data => {
                updateKennelPhoto(data);
                setKennelPhoto([data]);
            }
        );
    }

    const [isDeleteSuccess, setIsDeleteSuccess] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    // const [modalAnswerOpen, setModalAnswerOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    return (
        <>
            <SubmittingModal open={ modalOpen } onClose={ () => {
                setModalOpen(false);
                setIsSuccess(false);
                setIsDeleteSuccess(false);
            } }
                title={ isSuccess || isDeleteSuccess ? 'Данные успешно обновлены!' : 'Упс! Что-то пошло не так' } text={ (!isSuccess || !isDeleteSuccess) && 'Попробуйте еще раз' } isLink={ false } modalClass='modal-small' />
            {/* { isSuccess ? 'Данные успешно обновлены!' : isDeleteSuccess ? 'Фото удалено.' : 'Упс! Что-то пошло не так' } text={ (!isSuccess || !isDeleteSuccess) && 'Попробуйте еще раз' } isLink={ false } modalClass='modal-small' /> */ }
            {/* <SubmittingModal open={ modalAnswerOpen } onClose={ () => setModalAnswerOpen(false) } title={ isDeleteSuccess ? 'Фото удалено.' : 'Упс! Что-то пошло не так' } text={ isDeleteSuccess ? '' : 'Попробуйте еще раз' } path='/' isSubmit={ false } /> */ }
            <ConfirmingModal open={ modalConfirmOpen } onClose={ () => setModalConfirmOpen(false) } onDelete={ handleDelete } modalClass='modal-small' path='/' />
            <div className="acc-settings__profile">
                <h3 className="profile__heading">
                    Информация о питомнике
                </h3>
                <form action="#" method="put" onSubmit={ e => handleSubmit(e) } className="profile-form">

                    <div className="profile__avatar-container">
                        <button onClick={ (e) => {
                            setModalOpen(false);
                            setModalConfirmOpen(true);
                        } }
                            name="delete"
                            className="profile__avatar_delete"
                        >
                            <i className="fas edit-icon delete_avatar fa-times"></i>
                        </button>
                        <input id="avatar" type="file" className="profile__avatar_input" onChange={ e => handleAvatarClick(e) } />
                        <label htmlFor="avatar" className="profile__avatar_label">
                            <Avatar
                                className={ `profile__avatar ${classes.large}` }
                                src={ kennel.photo }
                            />
                        </label>
                    </div>
                    <InputField
                        label="Название питомника"
                        type="text"
                        inputName="kennelName"
                        id="kennel_name"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_kennel"
                        classNameInput="profile__input profile__input_kennel"
                        placeholder={ kennel.title }
                        value={ kennel.title }
                        disabled={ disabled.kennelName }
                        onClick={ () => setDisabled({ ...disabled, kennelName: false }) }
                        onChange={ (e) => handleOnChange(e) }
                        onBlur={ handleBlur }
                        err={ touched.kennelName && errors.kennelName }
                        isEditable={ true }
                    />

                    <div className="breeds-block">
                        <h5>Породы питомника</h5>
                        <ul className="breeds-list">
                            { breeds.map((breed) => {
                                return (
                                    <li className="breed">{ breed }</li>
                                )
                            }) }
                        </ul>
                        <TooltipArrow
                            btnClass="breed-tooltip"
                            tooltipClass="profile__tooltip"
                            tooltipContent="Чтобы отредактировать эти данные свяжитесь с нами по почте breederas@gmail.com"
                            btnContent={ <span className="breed-tooltip_text">Редактировать породы</span> }
                        />
                    </div>

                    <InputField
                        label="ФИО владельца"
                        type="text"
                        inputName="userName"
                        id="userName"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_name"
                        classNameInput="profile__input profile__input_name"
                        placeholder={ kennel.owner_name }
                        value={ kennel.owner_name }
                        disabled={ disabled.userName }
                        onClick={ () => setDisabled({ ...disabled, userName: false }) }
                        onChange={ (e) => handleOnChange(e) }
                        onBlur={ handleBlur }
                        isEditable={ true }
                        err={ touched.userName && errors.userName }
                    />

                    <InputField
                        label="Контактная почта"
                        type="text"
                        inputName="kennelEmail"
                        id="kennelEmail"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_name"
                        classNameInput="profile__input profile__input_name"
                        placeholder={ kennel.email }
                        value={ kennel.email }
                        disabled={ disabled.kennelEmail }
                        onClick={ () => setDisabled({ ...disabled, kennelEmail: false }) }
                        onChange={ (e) => handleOnChange(e) }
                        onBlur={ handleBlur }
                        isEditable={ true }
                        err={ touched.kennelEmail && errors.kennelEmail }
                    />

                    <InputField
                        label="Телефон"
                        type="text"
                        inputName="userPhone"
                        id="userPhone"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_phone"
                        classNameInput="profile__input profile__input_phone"
                        placeholder={ kennel.phone }
                        value={ kennel.phone }
                        disabled={ disabled.userPhone }
                        onClick={ (e) => {
                            e.preventDefault();
                            setDisabled({ ...disabled, userPhone: false })
                        } }
                        onChange={ (e) => handleOnChange(e) }
                        onBlur={ handleBlur }
                        isEditable={ true }
                        err={ touched.userPhone && errors.userPhone }
                    />

                    <TextArea
                        label="Описание питомника"
                        rows={ 7 }
                        placeholder={ `${kennel.description ? kennel.description : 'Кратко расскажите о питомнике, историю его основания, питомцах и достижениях.'}` }
                        value={ kennel.description }
                        fullWidth={ true }
                        classNameLabel="profile__textarea_label"
                        customClassContainer='textarea-container_kennel'
                        customClass='textarea-input_kennel'
                        inputName={ 'kennelDescription' }
                        maxLength={ 1000 }
                        isEditable={ true }
                        onClick={ (e) => {
                            e.preventDefault();
                            setDisabled({ ...disabled, kennelDescription: false })
                        } }
                        disabled={ disabled.kennelDescription }
                        onChange={ (e) => handleOnChange(e) }
                    />
                    <div className='textarea-limit_kennel'><span>До 1000 символов</span><span>{ `${dataToUpdate.kennelDescription != null ? dataToUpdate.kennelDescription.length : 0} / 1000` }</span></div>


                    <Button
                        btnClass="sec-outlined-btn profile__btn"
                        text="Сохранить"
                        disabled={ false }
                        isLink={ false }
                    />

                </form>
            </div>
        </>
    )
}

export default KennelSettings
