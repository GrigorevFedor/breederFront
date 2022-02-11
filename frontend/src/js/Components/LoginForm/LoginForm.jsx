import React from 'react';
import { useState, useEffect } from 'react';
import './LoginForm.scss';

import PasswordInput from '../UI/input/PasswordInput';
import InputField from '../UI/input/Input';
import Button from '../UI/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const forbidden = useSelector(state => state.login.isFalsePassword);


    useEffect(() => { }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value })
    };
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(user))
    }

    return (
        <div className="login-form__container">
            <form action="#" method="get" className="login-form__form">
                <div className="login-form__inner-container">
                    <h2 className="login-form__title">Войти на сайт</h2>
                    <InputField
                        inputName="email"
                        label='Введите почту'
                        type='email'
                        placeholder='example@example.ru'
                        isRequired={ true }
                        value={ user.email }
                        onChange={ handleOnChange }
                        isEditable={ false }
                    />
                    <PasswordInput
                        label='Введите пароль'
                        inputName='password'
                        placeholder='•••••••••'
                        isRequired={ true }
                        value={ user.password }
                        onChange={ handleOnChange }
                        autoComplete="current-password"
                    />
                    <div className="stay-logged">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Запомнить меня</label>
                    </div>
                    <Button
                        btnClass='btn-registration pr-filled-btn'
                        text='Войти'
                        isLink={ false }
                        type='submit'
                        onClick={ handleLogin }
                    />

                </div>
                { forbidden
                    ? <p className='err-msg err-msg-login'>Такой пользователь не найден.<br /> Проверьте email и пароль</p>
                    : ''
                }
            </form>
        </div>
    )
}

export default LoginForm;