import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import { Dialog, DialogTitle, Typography, DialogActions, Button, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteGroupPost } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.styles
})

class DeleteGroupPostInPost extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deletePost = () => {
        this.props.deleteGroupPost(this.props.postId);
        this.setState({ open: false });
        this.props.history.goBack();
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MenuItem onClick={ this.handleOpen }
                    className={ classes.deleteButton} >
                    Delete
                </MenuItem>
                <Dialog open={ this.state.open } 
                    onClose={ this.handleClose }
                    fullWidth
                    maxWidth='sm'>
                        <DialogTitle>
                            <Typography>
                                Are you sure you want to delete this post?
                            </Typography>
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={ this.handleClose } style={{ textTransform: 'none' }}>
                                <Typography color='error'>Cancel</Typography>
                            </Button>
                            <Button onClick={ this.deletePost } style={{ textTransform: 'none' }}>
                                <Typography color='secondary'>Delete</Typography>
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteGroupPostInPost.propTypes = {
    deleteGroupPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, { deleteGroupPost })(withStyles(styles)(DeleteGroupPostInPost));
