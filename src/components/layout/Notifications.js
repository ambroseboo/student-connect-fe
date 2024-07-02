import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

//MUI
import { Menu, MenuItem, IconButton, Tooltip, ListItemIcon, Typography, Badge } from '@material-ui/core';
import { Notifications as NotificationsIcon, ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';

import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
import { Fragment } from 'react';

dayjs.extend(relativeTime)

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null

        }
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        let unreadNotifications = this.props.notifications
            .filter(notification => !notification.read)
            .map(notification => notification.notificationId);
        this.props.markNotificationsRead({ notifications: unreadNotifications })
    }

    render() {
        const { notifications } = this.props;
        const { anchorEl } = this.state;
        let notificationIcon;
        if (notifications && notifications.length > 0) {
            const unread = notifications.filter(notification => notification.read === false).length
            unread > 0 ? 
                notificationIcon = (<Badge badgeContent={unread} color="error">
                    <NotificationsIcon color="secondary" />
                </Badge>) : (notificationIcon = <NotificationsIcon color="secondary" />)
        } else {
            notificationIcon = <NotificationsIcon color="secondary" />
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(notification => {
                const time = dayjs(notification.createdAt).fromNow();
                const sender = notification.sender;
                let text;
                let link;
                switch (notification.type) {
                    case 'post':
                        text = `${ sender } posted a new post in ${ notification.forum }`;
                        link = `/posts/${ notification.postId }`;
                        break;
                    case 'groupPost':
                        text = `${ sender } posted a new post in ${ notification.group }`;
                        link = `/group-posts/${ notification.groupPostId }`
                        break;
                    case 'comment':
                        if (notification.postId) {
                            text = `${ sender } commented on your post`;
                            link = `/posts/${ notification.postId }`
                        }
                        else if (notification.groupPostId) {
                            text = `${ sender } commented on your post`;
                            link = `/group-posts/${ notification.groupPostId }`
                        }
                        else if (notification.listingId) {
                            text = `${ sender } commented on your listing`;
                            link = `/marketplace/${ notification.listingId }`
                        };
                        break;
                    default:
                        text = '';
                        link = '/';
                }
                return (
                <MenuItem 
                    key={notification.notificationId} 
                    onClick={ this.handleClose } 
                    component={ Link }
                    to={ link }>
                    <ListItemIcon>
                        <ArrowBackIosIcon />
                    </ListItemIcon>
                    <Typography variant="body1">
                        { text }
                    </Typography>
                    &nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle2">
                        { time }
                    </Typography>
                </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem>)
        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                        { notificationIcon }
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}>
                        { notificationsMarkup }
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications)
