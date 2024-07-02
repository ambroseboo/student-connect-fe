import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Button, Link as MuiLink,  Typography, Paper, Tooltip } from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import EditDetails from './EditDetails';

import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.styles
  });

class CurrentProfileDisplay extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    render() {
        const { classes,
            user: {
                credentials: { username, createdAt, userImageUrl, bio, major, userId }
            }
        } = this.props;

        let profileMarkup = (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className={ classes.profileImageWrapper }>
                            <img src={userImageUrl} alt="profile" className={ classes.profileImage } />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <Tooltip title='Edit profile picture' arrow>
                            <Button className={ classes.editImageButton } onClick={ this.handleEditPicture }>
                                <EditIcon color="secondary" />
                            </Button>
                            </Tooltip>
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
                            <CalendarToday color="secondary" />&nbsp;&nbsp;
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                            <div style={{ position: 'absolute', right: '10%', bottom: '-15%'}}>
                                <EditDetails />
                            </div>
                        </div>
                    </div>
                </Paper>
            ) 

        return profileMarkup;

    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

CurrentProfileDisplay.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { uploadImage })(withStyles(styles)(CurrentProfileDisplay));