import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../../images/no-img.png';
// MUI
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  ...theme.styles
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className={ classes.profileImageWrapper }>
                <img src={NoImg} alt="profile" className={ classes.profileImage } />
            </div>
            <div className={ classes.profileDetails }>
                &nbsp;
                <br />
                <br />
                &nbsp;
                <br />
                    <Fragment>
                        &nbsp;&nbsp;
                        <span style={{ paddingBottom: '10px' }}>&nbsp;</span>
                        <br />
                    </Fragment>
                <br />
                &nbsp;&nbsp;
                <span>&nbsp;</span>
            </div>
        </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);