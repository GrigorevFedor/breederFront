import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTextField = styled(TextField)`
& .MuiInputLabel-root {
    font-family: 'IBM Plex Sans', 'arial', sans-serif;
    font-weight: 400;
    color: #1A1A1B;
    line-height: 22px;
    font-size: 24px;
    width: 200px;
    &.Mui-focused {
        color: #1A1A1B;
    }
}
& .MuiInputLabel-formControl {
    position: unset;
}
& .MuiInput-root {
    border: 1px solid #543D93;
    border-radius: 10px; 
    background-color: #FFFFFF;
    padding: 20px;

    font-style: italic;
    font-family: 'IBM Plex Sans', 'arial', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
}
& .Mui-error .MuiInput-root {
    border: 1px solid red;
}
& .MuiInput-focused {
    border: 1px solid #543D93;
}
        
`

function TextArea({ rows, inputName, label, placeholder, onChange, error, customClassContainer, className, classNameLabel, onClick, fullWidth, maxLength, propValue, disabled, isEditable }) {
    return (
         <div className={ customClassContainer }>
            <label htmlFor={ inputName } className={ classNameLabel }>{ label } {isEditable && <button name={inputName} onClick={ onClick } className="edit-icon_btn"><i className="fas edit-icon fa-pen"></i></button>}</label>
            <StyledTextField
                multiline
                rows={ rows }
                InputProps={ { disableUnderline: true } }
                inputProps={ { maxLength: maxLength } }
                fullWidth={ fullWidth }
                placeholder={ placeholder }
                onChange={ onChange }
                error={ error }
                className={ className }
                name={ inputName }
                value={ propValue }
                disabled={ disabled }
            />
        </div>                  
    )
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    maxLength: PropTypes.number,
    icon: PropTypes.node
}

export default TextArea

