import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import './Input.scss'

const PasswordInput = ({ label, inputName, id, customClass, classNameLabel, classNameInput, placeholder, pattern, isRequired, onChange, autoComplete, err, onBlur }) => {
    const [visible, setVisible] = useState({
        showPassword: false
    });
    useEffect(() => { }, [visible])
    const handleClickShowPassword = () => {
        setVisible({ ...visible, showPassword: !visible.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className={ `input-container ${customClass}` }>
            <label htmlFor={ inputName } className={ `label ${classNameLabel} ` }>{ label }</label>
            <Input
                type={ visible.showPassword ? 'text' : 'password' }
                id={ id }
                name={ inputName }
                className={ `input ${classNameInput} ` }
                onChange={ onChange }
                placeholder={ placeholder }
                pattern={ pattern }
                required={ isRequired }
                disableUnderline={ true }
                autoComplete={ autoComplete }
                onBlur={ onBlur }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={ handleClickShowPassword }
                            onMouseDown={ handleMouseDownPassword }
                        >
                            { visible.showPassword ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                    </InputAdornment>
                }>
            </Input>
            <p className='err-msg'>{ err }</p>
        </div>
    )
}

PasswordInput.propTypes = {
    label: PropTypes.string,
    inputName: PropTypes.string.isRequired,
    id: PropTypes.string,
    classNameLabel: PropTypes.string,
    classNameInput: PropTypes.string,
    placeholder: PropTypes.string,
    pattern: PropTypes.string,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func
}

export default PasswordInput;