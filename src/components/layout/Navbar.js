// MUI
import { Home as HomeIcon, Settings as SettingsIcon } from '@material-ui/icons';
import { IconButton, Typography, AppBar, 
    Toolbar, Button, Avatar } from "@material-ui/core";
import Settings from "./Settings";
import Notifications from './Notifications';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import React, { useState, useRef } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { logoutUser } from '../../redux/actions/userActions';

import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.styles,
})

const Navbar = (props) => {
    const { classes } = props;

    const menuRef = useRef();
    const buttonRef = useRef();

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    const openMenu = () => {
        setIsOpen(true);
    }

    const location = useLocation();
    const currentLocation = location.pathname === '/login' || location.pathname === '/signup' 
        ? '/' : location.pathname;
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                        <div className='nav-container-left'>
                            <Button component={ Link } to="/forums" color="secondary"><Typography>Forums</Typography></Button>
                            <Button component={ Link } to="/marketplace" color="secondary"><Typography>Marketplace</Typography></Button>
                            <Button component={ Link } to="/groups" color="secondary"><Typography>Groups</Typography></Button>
                        </div>
                        { props.authenticated ? <Button style={{ textTransform: 'none'}} component={Link} to={`/users/${props.userId}`}>
                            <Avatar className={ classes.imageSmall } 
                                alt={ props.username } 
                                src={ props.userImageUrl }></Avatar>
                            <Typography color="secondary">{ props.username }</Typography></Button> : null}
                        { props.authenticated ? <Notifications /> 
                            :   <IconButton
                                    component={Link} 
                                    to={{ pathname: '/login', state: { from: currentLocation }}}>
                                    <NotificationsIcon color='secondary' />
                                </IconButton>}
                        <IconButton color="inherit" component={ Link } to="/home"><HomeIcon color="secondary"/></IconButton>
                        <IconButton ref={buttonRef} onClick={openMenu} ><SettingsIcon color="secondary"/></IconButton>
                </Toolbar>
            </AppBar>
            <Settings id="menu" 
                forwardRef={ menuRef }
                anchorEl={ buttonRef.current } 
                open={ isOpen }
                onClose={ handleClose }
                authenticated={ props.authenticated } 
                logout={ props.logoutUser }/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    username: state.user.credentials.username,
    userImageUrl: state.user.credentials.userImageUrl,
    userId: state.user.credentials.userId
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Navbar));
