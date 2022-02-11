import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './ProfileSettings.scss'
import { makeStyles } from '@material-ui/core/styles';
import InputField from '../../Components/UI/input/Input';
import Button from '../../Components/UI/button/Button';
import PasswordInput from '../UI/input/PasswordInput';
import { useHistory } from 'react-router';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import ConfirmingModal from '../../Containers/ConfirmingModal/ConfirmingModal';
import { useSelector } from 'react-redux';
import getBase64 from '../../utils/getBase64';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));

function ProfileSettings() {
    const classes = useStyles();
    const history = useHistory();
    const userToken = useSelector(state => state.login.userToken);

    const [userPhoto, setUserPhoto] = useState('');
    const [user, setUser] = useState('');

    const getUser = async () => {
        try {
            await fetch(`/api/v2/profile/user/`, {
                method: 'GET',
                headers: {
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setUser({ ...data });
                    setUserPhoto(data.avatar)
                })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const [emailDisabled, setEmailDisabled] = useState(true);
    const [passwordDisabled, setPasswordDisabled] = useState(true);

    const [emailToUpdate, setEmailToUpdate] = useState({
        email: '',
        password: ''
    });
    const [passwordToUpdate, setPasswordToUpdate] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: false
    });

    const updateEmail = async () => {
        try {
            await fetch(`/api/v2/profile/user/`, {
                method: 'PUT',
                body: JSON.stringify({
                    email: user.email,
                    new_email: emailToUpdate.email,
                    password: emailToUpdate.password,
                }),
                headers: {
                    'Authorization': userToken.access_token.toString(),
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setModalOpen(true)
                    setTimeout(() => history.push('/lk-pitomnik'), 3000);
                    setEmailDisabled(true);
                    getUser();
                } else {
                    setIsSuccess(false)
                    setModalOpen(true)
                }
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
        setEmailToUpdate({
            email: '',
            password: ''
        });
    }

    const updatePassword = async () => {
        try {
            await fetch(`/api/v2/profile/user/`, {
                method: 'PUT',
                body: JSON.stringify({
                    password: passwordToUpdate.oldPassword,
                    new_password: passwordToUpdate.newPassword,
                    email: user.email
                }),
                headers: {
                    'Authorization': userToken.access_token.toString(),
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setModalOpen(true)
                    setTimeout(() => history.push('/lk-pitomnik'), 3000)
                    setPasswordDisabled(true);
                    getUser();
                } else {
                    setIsSuccess(false)
                    setModalOpen(true)
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
        setPasswordToUpdate({
            oldPassword: '',
            newPassword: '',
            confirmPassword: false
        });
    }

    const updateUserPhoto = async (file) => {
        try {
            await fetch(`/api/v2/profile/user/avatar/`, {
                method: 'PUT',
                body: JSON.stringify({
                    avatar: file,
                }),
                headers: {
                    'Authorization': userToken.access_token.toString(),
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setModalOpen(true)
                    setTimeout(() => history.push('/lk-pitomnik'), 3000)
                    getUser();
                } else {
                    setIsSuccess(false)
                    setModalOpen(true)
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await fetch(`/api/v2/profile/user/avatar/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': userToken.access_token.toString(),
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            })
                .then(res => {
                    if (res.ok) {
                        setModalAnswerOpen(true);
                        setIsDeleteSuccess(true);
                        setModalConfirmOpen(false);
                        setUserPhoto('');
                        getUser();
                    } else {
                        setModalAnswerOpen(true);
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
                updateUserPhoto(data);
                setUserPhoto([data]);
            }
        );
    }

    const [emailMatch, setEmailMatch] = useState(false);

    const checkEmail = e => {
        if (e.target.value !== user.email) {
            setEmailMatch(false);
        } else if (e.target.value === user.email) {
            setEmailMatch(true);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (emailDisabled === false) {
            if (emailMatch) {
                updateEmail();
            } else {
                setModalOpen(true);
                setIsSuccess(false);
            }
        }
        if (passwordDisabled === false) {
            if (passwordToUpdate.confirmPassword) {
                updatePassword();
            } else {
                setModalOpen(true);
                setIsSuccess(false);
            }
        }
    }

    const [isDeleteSuccess, setIsDeleteSuccess] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [modalAnswerOpen, setModalAnswerOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    return (
        <>
            <SubmittingModal open={ modalOpen } onClose={ () => setModalOpen(false) } title={ isSuccess ? 'Данные успешно обновлены!' : 'Упс! Что-то пошло не так' } text={ !isSuccess && 'Попробуйте еще раз' } isLink={ false } modalClass='modal-small' />
            <SubmittingModal open={ modalAnswerOpen } onClose={ () => setModalAnswerOpen(false) } title={ isDeleteSuccess ? 'Фото удалено.' : 'Упс! Что-то пошло не так' } text={ isDeleteSuccess ? '' : 'Попробуйте еще раз' } path='/' isSubmit={ false } />
            <ConfirmingModal open={ modalConfirmOpen } onClose={ () => setModalConfirmOpen(false) } onDelete={ handleDelete } modalClass='modal-small' path='/' />
            <div className="acc-settings__profile">
                <h3 className="profile__heading">
                    Настройки профиля
                </h3>
                <form action="#" method="post" onSubmit={ e => handleSubmit(e) } className="profile-form">
                    <div className="profile__avatar-container">
                        <button onClick={ (e) => setModalConfirmOpen(true) } name="delete" className="profile__avatar_delete" >
                            <i className="fas edit-icon delete_avatar fa-times"></i>
                        </button>
                        <input id="avatar" type="file" className="profile__avatar_input" onChange={ e => handleAvatarClick(e) } />
                        <label htmlFor="avatar" className="profile__avatar_label">
                            <Avatar
                                className={ `profile__avatar ${classes.large}` }
                                src={ user.avatar }
                            />
                        </label>
                    </div>

                    {
                        emailDisabled
                            ? <InputField
                                label="Email"
                                type="text"
                                inputName="email"
                                id="email"
                                customClass="profile__email"
                                classNameLabel="profile__email_label"
                                classNameInput="profile__email_input"
                                placeholder={ user.email }
                                disabled={ emailDisabled }
                                isEditable={ true }
                                onClick={ () => setEmailDisabled(!emailDisabled) }
                            />
                            : <div className="edit-block">

                                <InputField
                                    label="Старая почта"
                                    type="text"
                                    inputName="oldEmail"
                                    id="oldEmail"
                                    customClass="profile__email"
                                    classNameLabel="profile__email_label"
                                    classNameInput="profile__email_input"
                                    placeholder=''
                                    isEditable={ false }
                                    onChange={ e => checkEmail(e) }
                                />

                                <InputField
                                    label="Новая почта"
                                    type="text"
                                    inputName="newEmail"
                                    id="newEmail"
                                    customClass="profile__email"
                                    classNameLabel="profile__email_label"
                                    classNameInput="profile__email_input"
                                    placeholder=''
                                    isEditable={ false }
                                    onChange={ e => setEmailToUpdate({ ...emailToUpdate, email: e.target.value }) }
                                />
                                <PasswordInput
                                    label='Пароль'
                                    inputName='password'
                                    placeholder=''
                                    onChange={ e => setEmailToUpdate({ ...emailToUpdate, password: e.target.value }) }
                                />
                            </div>
                    }


                    {
                        passwordDisabled
                            ? <InputField
                                label="Пароль"
                                type="password"
                                inputName="password"
                                id="password"
                                customClass="profile__password"
                                classNameLabel="profile__password_label"
                                classNameInput="profile__password_input"
                                placeholder="•••••••••"
                                disabled={ passwordDisabled }
                                isEditable={ true }
                                onClick={ () => setPasswordDisabled(!passwordDisabled) }
                            />
                            : <div className="edit-block">

                                <PasswordInput
                                    label='Старый пароль*'
                                    inputName='oldPassword'
                                    placeholder=''
                                    onChange={ e => setPasswordToUpdate({ ...passwordToUpdate, oldPassword: e.target.value }) }
                                />

                                <PasswordInput
                                    label='Новый пароль*'
                                    inputName='newPassword'
                                    placeholder=''
                                    onChange={ e => setPasswordToUpdate({ ...passwordToUpdate, newPassword: e.target.value }) }
                                />
                                <PasswordInput
                                    label='Подтвердите пароль*'
                                    inputName='newPassword'
                                    placeholder=''
                                    onChange={ e => {
                                        if (passwordToUpdate.newPassword === e.target.value) {
                                            setPasswordToUpdate({ ...passwordToUpdate, confirmPassword: true });
                                        }
                                    } }
                                />
                            </div>
                    }


                    <Button
                        btnClass="sec-outlined-btn profile__btn"
                        text="Сохранить"
                        disabled={ emailDisabled || passwordDisabled ? false : true }
                        isLink={ false }
                    />

                </form>
            </div>
        </>
    )
}

export default ProfileSettings
