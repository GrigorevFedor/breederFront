import React from 'react';
import './Button.scss';

import CustomLink from '../../CustomLink';

function Button({ btnClass, text, path, isLink, onClick, type, disabled = false }) {
    return (
      isLink
            ? <CustomLink to={ path }
                tag="button"
                disabled={disabled}
                className={ `button ${btnClass} ` }
            >
                <span>{ text }</span>
            </CustomLink>
            : <button type={ type } className={ `button ${btnClass} ` } disabled={ disabled } onClick={ onClick }>{ text }</button>
    )
}

export default Button