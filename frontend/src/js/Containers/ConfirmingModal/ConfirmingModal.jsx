import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '../../Components/UI/button/Button';
import styled from 'styled-components';

import './ConfirmingModal.scss'

const StyledDialog = styled(Dialog)`
& .MuiDialog-paperWidthSm {
    max-width: 380px;
    min-width: 260px;
}`

function ConfirmingModal(props) {
    const { onClose, open, onDelete, path, modalClass, isLink } = props;

    return (
        <StyledDialog onClose={ onClose } aria-labelledby="simple-dialog-title" open={ open }>
            <div className={ `modal-respond ${modalClass}` } >
                <div className="modal-respond__header">
                    <h3 className="modal-respond__title">Вы уверены?</h3>
                    <button className="modal-respond__close modal-respond__cross" onClick={ onClose }>
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 17L17 28M28 28L17 17L28 28Z" stroke="#1A1A1B" />
                        </svg>
                    </button>
                </div>
                <div className="btns-container">
                    <Button
                        btnClass='sec-filled-btn modal-button'
                        text='Да'
                        isLink={ isLink }
                        path={ path }
                        type='button'
                        onClick={ onDelete }
                    />
                    <Button
                        btnClass='sec-filled-btn modal-button'
                        text='Нет'
                        isLink={ isLink }
                        path={ path }
                        type='button'
                        onClick={ onClose }
                    />
                </div>

            </div>
        </StyledDialog>
    );
}

ConfirmingModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ConfirmingModal;

