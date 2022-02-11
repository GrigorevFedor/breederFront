import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';


const StyledIconButton = styled(IconButton)`
&.MuiIconButton-root {
    position: absolute;
    top: -8px;
    right: -10px;
    padding: 0px;
}
&.MuiButtonBase-root {
    background-color: #fff;
}
        
`

function DeleteButton({ onClick }) {

    return (
        <StyledIconButton
            onClick={ onClick }
            type='button'
            className='delete-image-btn'
        >
            <CancelIcon />
        </StyledIconButton>

    )
}


export default DeleteButton;