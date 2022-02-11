import React, { useState, useEffect } from 'react';
import './RegistrationForm.scss';
import 'react-phone-input-2/lib/style.css'
import InputField from '../UI/input/Input'
import PasswordInput from '../UI/input/PasswordInput';
import PhoneInput from 'react-phone-input-2'
import Button from '../UI/button/Button'
import MultiplySelectInput from '../UI/input/MultiplySelectInput';
import { useHistory } from 'react-router';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import TooltipArrow from '../UI/popup/TooltipArrow';
import { kennelNameValidation, nameValidation, emailValidation, contactEmailValidation, passwordValidation } from '../../utils/validation'
import { useSelector } from 'react-redux';


function RegistrationForm() {
    const [newUser, setNewUser] = useState({
        kennelName: '',
        userName: '',
        phone: '',
        email: '',
        contactEmail: '',
        password: '',
        passwordConfirm: '',
        pdagreement: null,
    });

    const [userPhone, setuserPhone] = useState('')
    const breeds = useSelector(state => state.breeds);
    const [breedName, setbreedName] = useState([]);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isError, setIsError] = useState(false);
    const [hasEmptyFields, setHasEmptyFields] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [isConflict, setisConflict] = useState(false);
    const [serverError, setServerError] = useState('');
    const [disabled, setIsDisabled] = useState(false);
    const [isSameEmail, setIsSameEmail] = useState(false)


    const history = useHistory();

    useEffect(() => { }, [newUser])

    useEffect(
        () => { },
        [errors]
    );

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setNewUser({ ...newUser, [name]: value })
        setTouched({
            ...touched,
            [name]: true
        });
    };

    const handleBlur = evt => {
        const { name, value } = evt.target;
        const { [name]: removedError, ...rest } = errors;
        const error = validate[name](value);
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error })
        });
    };

    const handleCheckBox = (e) => {
        let isChecked = e.target.checked;
        setNewUser({ ...newUser, pdagreement: isChecked })
    }

    const handleEmailsCheckBox = (e) => {
        if (e.target.checked) {
            setNewUser({ ...newUser, contactEmail: newUser.email })
            document.querySelector('input[name="contactEmail"]').value = ''
            setIsDisabled(true)
        } else if (!e.target.checked) {
            setNewUser({ ...newUser, contactEmail: '' })
            setIsDisabled(false)
        }
        console.log(e.target.checked);
    }

    const validate = {
        kennelName: name => kennelNameValidation(name),
        userName: name => nameValidation(name),
        email: emailValidation,
        contactEmail: contactEmail => contactEmailValidation(contactEmail, disabled),
        password: passwordValidation
    };

    const isEmptyObj = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }
    console.log(errors);
    console.log(touched);

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (isEmptyObj(errors) && !isEmptyObj(touched) && newUser.pdagreement) {
            if (newUser.password === newUser.passwordConfirm) {
                sendRegistrationData(newUser);
            } else {
                setIsError(true)
            }
        } else {
            setHasEmptyFields(true)
        }
    }

    const [modalOpen, setmodalOpen] = useState(false);

    const handleClose = () => {
        setmodalOpen(false);
    };

    const formatBreeds = () => {
        const breedsToPost = [];
        breedName.map(breed => {
            breedsToPost.push({
                name: breed
            });
        });
        return breedsToPost;
    }

    const sendRegistrationData = () => {
        fetch(`/api/v2/auth/signup/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset="utf-8"'
            },
            body: JSON.stringify({
                email: newUser.email,
                kennel_email: newUser.contactEmail,
                password: newUser.password,
                title: newUser.kennelName,
                owner_name: newUser.userName,
                phone: userPhone,
                breeds: formatBreeds()
            })
        })
            .then(response => {
                if (response.ok) {
                    setmodalOpen(true)
                    setTimeout(() => history.push('/signin'), 3000)
                    window.ym(84678121, 'reachGoal', 'signin_success')
                } else if (response.status === 409) {
                    setisConflict(true)
                    setmodalOpen(true)
                    setIsSuccess(false)
                } else {
                    setmodalOpen(true)
                    setIsSuccess(false)
                    setisConflict(false)
                    setHasEmptyFields(false)
                    setServerError(response.status)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Регистрация прошла успешно' : isConflict ? 'Такой пользователь уже есть' : 'Упс! Что-то пошло не так' } text={ isSuccess ? 'Теперь вы можете войти в свой аккаунт' : isConflict ? 'Попробуйте еще раз' : `Код ошибки: ${serverError}` } path='/signin' isSubmit={ true } modalClass='modal-big' onClick={ handleClose } />
            <div className="registration-block">
                <div className="registration-container">
                    <h2 className="registration__header">Регистрация</h2>
                    <form action="#" method="post" id="registration-form" autoComplete='off' >
                        <InputField
                            label='Название питомника '
                            type='text'
                            inputName='kennelName'
                            placeholder='Введите название'
                            value={ newUser.kennelName }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.kennelName && errors.kennelName }
                            isEditable={ false }
                            classNameInput=''
                            customClass=''

                        />
                        <MultiplySelectInput
                            inputName='breeds'
                            value={ breedName }
                            onChange={ (event, newValue) => {
                                setbreedName(newValue);
                            } }
                            customClass='registration-breeds'
                            classNameInput='input-multiply'
                            breeds={ breeds }
                            label='Породы в питомнике'
                            placeholder='Выберите породу '
                            tip={
                                <TooltipArrow
                                    btnClass="breed-tooltip"
                                    tooltipClass="profile__tooltip"
                                    tooltipContent="Если вы не нашли нужную вам породу в списке, напишите нам на адрес breederas@gmail.com, и мы ее добавим"
                                    btnContent={ <img alt="" src="/img/question.svg" className="breed-tooltip_icon" /> }
                                />
                            }
                        />
                        <InputField
                            label='Ф.И.О. владельца'
                            type='text'
                            inputName='userName'
                            placeholder='Иванов Иван Иванович'
                            value={ newUser.userName }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.userName && errors.userName }
                            autoComplete="name"
                            isEditable={ false }
                            classNameInput=''
                            customClass='registration-name'
                        />
                        <div className='input-container registration-phone'>
                            <label htmlFor="phone" className='label phone-label'>Телефон</label>
                            <PhoneInput
                                type='text'
                                inputProps={ { name: 'phone' } }
                                placeholder='+7 (___) - __ - __'
                                value={ userPhone }
                                onChange={ (newValue) => {
                                    setuserPhone(`+${newValue}`);
                                } }
                                autoComplete="tel"
                                preferredCountries={ ['ru', 'ua', 'by', 'kz'] }
                                priority={ { ru: 0, kz: 1 } }
                                copyNumbersOnly={ false }
                                inputClass='input'
                            />
                        </div>
                        <InputField
                            label='Регистрационная почта'
                            type='email'
                            inputName='email'
                            placeholder='example@example.ru'
                            value={ newUser.email }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.email && errors.email }
                            isEditable={ false }
                            classNameInput=''
                            customClass='registration-email'
                        />
                        <InputField
                            label='Контактная почта'
                            type='email'
                            inputName='contactEmail'
                            placeholder='example@example.ru'
                            value={ newUser.contactEmail }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ disabled ? delete errors.contactEmail : touched.contactEmail && errors.contactEmail }
                            isEditable={ false }
                            disabled={ disabled }
                            classNameInput=''
                            customClass='registration-contact-email'
                        />
                        <div className='email-checkbox_container registration-email-checkbox'>
                            <input type="checkbox" name="email-checkbox" id="email-checkbox" className=""
                                onChange={ handleEmailsCheckBox } ></input>
                            <label htmlFor="email-checkbox" className="email-checkbox">Контактная почта совпадает с регистрационной почтой</label>
                        </div>
                        <PasswordInput
                            label='Придумайте пароль'
                            inputName='password'
                            placeholder='•••••••••'
                            value={ newUser.password }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.password && errors.password }
                            autoComplete="new-password"
                            classNameInput=''
                            customClass='registration-password'
                        />
                        <PasswordInput
                            label='Придумайте пароль'
                            inputName='passwordConfirm'
                            placeholder='•••••••••'
                            value={ newUser.passwordConfirm }
                            onChange={ handleOnChange }
                            autoComplete="new-password"
                            classNameInput=''
                            customClass='registration-password-repeat'
                        />

                        { isError
                            ? <p className='err-msg'>Гав! Пароли не совпадают</p>
                            : ''
                        }
                    </form>
                    <div className="personal-data">
                        <input type="checkbox" name="pd-agreement" id="agreement" className="feedback-form__agreement-checkbox"
                            required onChange={ handleCheckBox } checked={ newUser.pdagreement } ></input>
                        <label htmlFor="agreement" className="feedback-form__agreement">даю свое согласие на обработку моих персональных данных и подтверждаю, что ознакомлен(а) с <a href='./documents/Политика конфиденциальности Breeder.pdf' className='pd-agreement-link' download> пользовательским соглашением </a></label>
                    </div>
                    { hasEmptyFields
                        ? <p className='err-msg'>Заполните, пожалуйста, все поля</p>
                        : ''
                    }
                    <Button
                        text='Зарегистрироваться'
                        isLink={ false }
                        btnClass='btn-registration pr-filled-btn'
                        onClick={ handleSubmitClick }
                    />
                </div>
            </div>
        </>
    )
}

export default RegistrationForm;