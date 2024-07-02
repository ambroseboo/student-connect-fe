import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import { Dialog, DialogTitle, Typography, DialogActions, Button, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.styles
})

class DeleteComment extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteComment = () => {
        this.props.deleteComment(this.props.commentId);
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MenuItem onClick={ this.handleOpen }
                    className={ classes.deleteButton } >
                    Delete
                </MenuItem>
                <Dialog open={ this.state.open } 
                    onClose={ this.handleClose }
                    fullWidth
                    maxWidth='sm'>
                        <DialogTitle>
                            <Typography>
                                Are you sure you want to delete this comment?
                            </Typography>
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={ this.handleClose } style={{ textTransform: 'none' }}>
                                <Typography color='error'>Cancel</Typography>
                            </Button>
                            <Button onClick={ this.deleteComment } style={{ textTransform: 'none' }}>
                                <Typography color='secondary'>Delete</Typography>
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteComment.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(null, { deleteComment })(withStyles(styles)(DeleteComment));
