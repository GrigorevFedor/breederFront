import React, { useState, useEffect } from 'react';
import './AuthNavbarPart.scss';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/actions';
import translit from '../../../utils/translit';

const useStyles = makeStyles({
    colorDefault: {
        backgroundColor: 'transparent'
    }
});

function AuthNavbarPart() {

    const dispatch = useDispatch()
    const userToken = useSelector(state => state.login.userToken);

    const [kennel, setKennel] = useState('');
    const [kennelTranslit, setKennelTranslit] = useState('');

    const getKennel = (async () => {
        try {
            await fetch(`/api/v2/profile/kennel/`, {
                method: 'GET',
                headers: {
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setKennel({ ...data });
                    let title = translit(data.title)
                    setKennelTranslit(title);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    })

    useEffect(() => {
        getKennel();
    }, []);

    const [userPhoto, setUserPhoto] = useState('');

    const getUserPhoto = (async () => {
        try {
            await fetch(`/api/v2/profile/user/`, {
                method: 'GET',
                headers: {
                    'Authorization': userToken.access_token.toString()
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setUserPhoto(data.avatar)
                })
        } catch (error) {
            console.error('Error:', error);
        }
    })

    useEffect(() => {
        getUserPhoto();
    }, []);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const history = useHistory();

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        dispatch(logout())
    }

    return (
        <>
            <Avatar
                classes={ {
                    colorDefault: classes.colorDefault
                } }
                variant="circular"
                className="avatar-header"
                aria-controls="simple-menu"
                aria-haspopup="true"
                aria-owns={ anchorEl ? "simple-menu" : undefined }
                onClick={ handleClick }
                onMouseOver={ handleClick }
                src={ userPhoto }
            >
                <img alt="avatar" src="/img/avatar-fallback.svg" />
            </Avatar>
            <Menu
                id="simple-menu"
                className="menu-popup"
                anchorEl={ anchorEl }
                MenuListProps={ { onMouseLeave: handleClose } }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
            >
                <MenuItem onClick={ handleClose } className="menu-popup-item">
                    <Link
                        to="/lk-pitomnik">
                        Профиль
                    </Link>
                </MenuItem>
                <MenuItem onClick={ handleClose } className="menu-popup-item">
                    <Link
                        to={ `/pitomnik/${kennelTranslit}/${kennel.id}` }
                        onClick={ () => history.push(`/pitomnik/${kennelTranslit}/${kennel.id}`) }
                    >
                        Питомник
                    </Link>
                </MenuItem>
                <MenuItem onClick={ handleLogout } className="menu-popup-item">
                    <Link
                        to="/">
                        Выйти
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default AuthNavbarPart;
