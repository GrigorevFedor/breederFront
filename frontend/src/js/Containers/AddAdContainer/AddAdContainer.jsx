import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../../Components/UI/button/Button';

import './AddAdContainer.scss'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
            <h2 className='addform-title'>{ children }</h2>
            { onClose ? (
                <IconButton aria-label="close" className={ classes.closeButton } onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            ) : null }
        </MuiDialogTitle>
    );
});

export default function AddAdModal({text, btnClass, title, content, dividers, isMobile, mobileBlock}) {
    const [open, setOpen] = useState(false);

    const handleClickOpenAd = () => {
        setOpen(true);
    };
    const handleCloseAd = () => {
        setOpen(false);
    };
    return (
        <div>
            {isMobile ? 
                <div 
                    onClick={ handleClickOpenAd }
                    open={ open }

                >
                    {mobileBlock}
                </div> :
            <Button
                btnClass={btnClass}
                text={text}
                isLink={ false }
                onClick={ handleClickOpenAd }
                open={ open }
            />}
            <Dialog onClose={ handleCloseAd } aria-labelledby="customized-dialog-title" open={ open } fullWidth={ true } scroll={ 'body' }>
                <DialogTitle id="customized-dialog-title" onClose={ handleCloseAd }>
                    {title}
                </DialogTitle>
                <DialogContent dividers={dividers}>
                    {content}
                </DialogContent>
            </Dialog>
        </div>
    );
}