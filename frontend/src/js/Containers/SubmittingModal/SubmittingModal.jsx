import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '../../Components/UI/button/Button';
import styled from 'styled-components';

import './SubmittingModal.scss'

const StyledDialog = styled(Dialog)`
& .MuiDialog-paperWidthSm {
    max-width: 380px;
    min-width: 260px;
}
        
`

function SubmittingModal(props) {
    const { onClose, open, title, text, path, isSubmit, modalClass, onClick, isLink } = props;


    return (
        <StyledDialog onClose={ onClose } aria-labelledby="simple-dialog-title" open={ open }>
            <div className={ `modal-respond ${modalClass}` } >
                <div className="modal-respond__header">
                    <h3 className="modal-respond__title">{ title }</h3>
                    <button className="modal-respond__close modal-respond__cross" onClick={ onClose }>
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 17L17 28M28 28L17 17L28 28Z" stroke="#1A1A1B" />
                        </svg>
                    </button>
                </div>
                { isSubmit
                    ? <img className="modal-respond__image" src="./img/background_modal.png" alt="boy with cat" width="360" height="225" />
                    : '' }
                <p className="modal-respond__text">{ text }</p>
                <Button
                    btnClass='sec-filled-btn modal-button'
                    text='Ok'
                    isLink={ isLink }
                    path={ path }
                    type='button'
                    onClick={ onClose }
                />
            </div>
        </StyledDialog>
    );
}

SubmittingModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default SubmittingModal;

