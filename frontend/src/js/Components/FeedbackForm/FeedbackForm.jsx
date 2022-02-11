import React, { useState, useEffect } from 'react';
import './FeedbackForm.scss';
import Button from '../UI/button/Button';
import TextArea from '../UI/textarea/TextArea';

import InputField from '../UI/input/Input';
import { nameValidation, emailValidation } from '../../utils/validation'
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';


function FeedbackForm() {
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [currentInput, setCurrentInput] = useState('');

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => { }, [feedback])
    useEffect(() => { }, [errors])

    const handleChange = (e) => {
        let inputName = e.currentTarget.name;
        setCurrentInput(inputName);
        console.log(currentInput);
        setFeedback({
            ...feedback,
            [inputName]: e.target.value
        });
        console.log(feedback);
        setTouched({
            ...touched,
            [inputName]: true
        });
    }

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
        name: name => nameValidation("User Name", name),
        email: emailValidation,
    };

    const [modalOpen, setmodalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const handleClickOpen = () => {
        setmodalOpen(true);
    };

    const handleClose = () => {
        setmodalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(feedback);
        try {
            await fetch(`/api/v2/feedback/`, {
                method: 'POST',
                body: JSON.stringify({
                    name: feedback.name,
                    email: feedback.email,
                    message: feedback.message,
                    // created_at: new Date().toLocaleDateString()
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            })
                .then(res => {
                    if (res.ok) {
                        setIsSuccess(true)
                        setmodalOpen(true);

                    } else {
                        setIsSuccess(false)
                        setmodalOpen(true);
                    }
                });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    return (
        <>
            <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Сообщение отправлено!' : 'Упс! Что-то пошло не так' } text={ !isSuccess && 'Попробуйте еще раз' } path={ '/' } onClick={ handleClose } modalClass='modal-small' />
            <div className="feedback-form__block">
                <div className="feedback-form__wrapper">
                    <div className="feedback-form__info">
                        <h3 className="feedback-form__info_heading">
                            Свяжитесь с нами
                        </h3>
                        <div className="feedback-form__info_text">
                            У нас вы можете не опасаться мошенников,
                            мы ни в коем случае не оставим вас без поддержки и ответа на интересующий вопрос.
                            Оставляйте заявку и в ближайшее время мы свяжемся с вами.
                            Ежедневно мы расширяем базу заводчиков и регулярно общаемся с питомниками.
                            Если на данный момент у нас нет интересующей вас породы, пишите! Мы дадим знать, когда появится щенок.
                        </div>
                    </div>

                    <div className="feedback-form__container">
                        <form noValidate className="feedback-form" action='#' method='post' onSubmit={ e => handleSubmit(e) }>
                            <InputField
                                label="Имя"
                                type="text"
                                inputName="name"
                                customClass={ `feedback-form__input__container` }
                                classNameLabel="feedback-form__label"
                                classNameInput={ `feedback-form__input` }
                                placeholder="Имя"
                                isRequired={ true }
                                onChange={ e => handleChange(e) }
                                onBlur={ handleBlur }
                                value={ feedback.name }
                                err={ touched.name && errors.name }
                            />

                            <InputField
                                label="Email"
                                type="email"
                                inputName="email"
                                customClass={ `feedback-form__input__container` }
                                classNameLabel="feedback-form__label"
                                classNameInput={ `feedback-form__input` }
                                placeholder="example@example.ru"
                                isRequired={ true }
                                onChange={ e => handleChange(e) }
                                value={ feedback.email }
                                onBlur={ handleBlur }
                                err={ touched.email && errors.email }
                            />
                            <TextArea
                                rows={ 5 }
                                name="message"
                                inputName="message"
                                label="Сообщение"
                                placeholder="Введите текст"
                                value={ feedback.message }
                                onChange={ e => handleChange(e) }
                                fullWidth={ true }
                                classNameLabel="feedback__textarea_label"
                                className={ `feedback-form-textarea 
                                   feedback-form__input__container 
                                   `}
                            />

                            <Button
                                isLink={ false }
                                text="Отправить"
                                btnClass="feedback-btn sec-outlined-btn button"

                            />
                        </form>
                    </div>

                    <div className="feedback-form__img-container">
                        <img
                            className="feedback-form__img-container_img"
                            src="./img/img_feedback.png"
                            alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedbackForm
