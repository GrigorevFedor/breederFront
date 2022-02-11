import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

import './Input.scss'


const InputField = ({ label, type, inputName, id, customClass, classNameLabel, classNameInput, placeholder, pattern, isRequired, onChange, err, isEditable, onClick, onBlur, autoComplete, disabled = false }) => {

    return (
        <div className={ `input-container ${customClass}` }>
            <label htmlFor={ inputName } className={ `label ${classNameLabel} ` }>{ label } { isEditable && <button type='button' onClick={ onClick } name={ inputName } className="edit-icon_btn"><i className="fas edit-icon fa-pen"></i></button> }</label>
            <Input
                type={ type }
                id={ id }
                name={ inputName }
                className={ `input ${classNameInput} ` }
                onChange={ onChange }
                placeholder={ placeholder }
                required={ isRequired }
                disableUnderline={ true }
                disabled={ disabled }
                onBlur={ onBlur }
                autoComplete={ autoComplete }
            />
            <p className='err-msg'>{ err }</p>
        </div>
    )
}

InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    classNameLabel: PropTypes.string,
    classNameInput: PropTypes.string,
    placeholder: PropTypes.string,
    pattern: PropTypes.string,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    err: PropTypes.string,
    autoComplete: PropTypes.string,
    isEditable: PropTypes.bool
}

export default InputField;