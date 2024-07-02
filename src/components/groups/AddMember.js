import React, { Component } from 'react';
import { DialogContent, Tooltip, IconButton, Dialog, 
    DialogTitle, TextField, Button, CircularProgress } from '@material-ui/core';
import { GroupAdd as GroupAddIcon, Close as CloseIcon } from '@material-ui/icons';
import { addMember, clearErrors } from '../../redux/actions/dataActions';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Fragment } from 'react';

const styles = (theme) => ({
    ...theme.styles
});

class AddMember extends Component {
    state = {
        open: false,
        username: '',
        errors: {}
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors })
        }
        if (prevProps.UI.errors || prevProps.UI.loading) {
            if (!this.props.UI.errors && !this.props.UI.loading) {
                this.setState({ title: '', body: '' });
                this.handleClose();
            }
        }
    }

    handleOpen = () => this.setState({ open: true });

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    }

    handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
    
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addMember(this.props.groupId, this.state.username);
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <Tooltip title='Add a member' arrow>
                    <IconButton onClick={ this.handleOpen }>
                        <GroupAddIcon color='secondary' />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={ this.state.open }
                    onClose={ this.handleClose }
                    fullWidth maxWidth='sm'>
                    <DialogContent>
                        <IconButton onClick={ this.handleClose } className={ classes.closeButton }>
                            <CloseIcon color='secondary' />
                        </IconButton>
                        <DialogTitle>Add a member</DialogTitle>
                        <form onSubmit={ this.handleSubmit }>
                            <TextField
                                name='username'
                                type='text'
                                label='Username'
                                rows='1'
                                placeholder={'Who would you like to add?'}
                                error={ errors.user ? true : false }
                                helperText={ errors.user ? errors.user : null }
                                className={ classes.textField}
                                onChange={ this.handleChange }
                                fullWidth
                                color='secondary' />
                            <Button type="submit" variant="outlined" color="secondary"
                                className={ classes.submitButton } disabled={ loading }
                                style={{ marginBottom: '2%' }}>
                                Submit
                                { loading &&
                                    (<CircularProgress 
                                        size={ 30 } 
                                        className={ classes.progress }/>) }
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapActionsToProps = {
    addMember,
    clearErrors
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddMember))
