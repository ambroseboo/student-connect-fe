import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Link as MuiLink,  Typography, Paper } from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';

import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.styles
  });

class ProfileDisplay extends Component {
    render() {
        const { classes,
            user: { username, createdAt, userImageUrl, bio, major, userId }
        } = this.props;

        return (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className={ classes.profileImageWrapper }>
                            <img src={userImageUrl} alt="profile" className={ classes.profileImage } />
                        </div>
                        <div className={ classes.profileDetails }>
                            <MuiLink
                                component={Link}
                                to={`/users/${userId}`}
                                color="secondary"
                                variant="h5">
                                @{username}
                            </MuiLink>
                            <br />
                            <br />
                            {bio ? <Typography variant="body1">{bio}</Typography> : 
                                <Typography variant="body1">No bio</Typography>}
                            <br />
                            {major ? (
                                <Fragment>
                                    <ClassIcon color="secondary" />&nbsp;&nbsp;
                                    <span style={{ paddingBottom: '10px' }}>{major}</span>
                                    <br />
                                </Fragment>
                            ) : 
                            <Fragment>
                                    <ClassIcon color="secondary" />&nbsp;&nbsp;
                                    <span style={{ paddingBottom: '10px' }}>No major indicated</span>
                                    <br />
                                </Fragment>}
                            <br />
                            <CalendarToday color='secondary' />&nbsp;&nbsp;
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                    </div>
                </Paper>
            );
    }
}

ProfileDisplay.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileDisplay);