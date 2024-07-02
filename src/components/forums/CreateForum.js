import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// MUI
import { IconButton, Button, TextField, Dialog, 
    DialogContent, DialogTitle, CircularProgress, Tooltip, Select, Input, MenuItem } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { createForum, clearErrors } from '../../redux/actions/dataActions';
import { faculties } from '../../util/data';

const styles = (theme) => ({
    ...theme.styles
})

class CreateForum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            title: '',
            faculty: '',
            errors: {},
        };
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors })
        }
        if (prevProps.UI.errors || prevProps.UI.loading) {
            if (!this.props.UI.errors && !this.props.UI.loading) {
                this.setState({ title: '', faculty: '' });
                this.handleClose();
            }
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createForum({ title: this.state.title, 
            faculty: this.state.faculty }, this.props.history)
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }, user: { /* credentials: { username }, */ authenticated }} = this.props;
        return (
            <Fragment>
                <Tooltip title='Create a forum' arrow>
                    { authenticated ? 
                    (<IconButton color='secondary' onClick={ this.handleOpen }>
                        <AddIcon/>
                    </IconButton>) : 
                    (<IconButton color='secondary' component={ Link } 
                        to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                        <AddIcon/>
                    </IconButton>)}              
                    
                </Tooltip>
                <Dialog open={ this.state.open } 
                    onClose={ this.handleClose } 
                    fullWidth maxWidth='sm'>
                    <IconButton onClick={ this.handleClose } className={ classes.closeButton }>
                        <CloseIcon/>
                    </IconButton>
                    <DialogTitle>Create a new forum</DialogTitle>
                    <DialogContent>
                        <form onSubmit={ this.handleSubmit }>
                            <TextField
                                color="secondary"
                                name='title'
                                type='text'
                                label='Forum title'
                                multiline
                                rows='1'
                                placeholder={ `What will the forum be about?` }
                                error={ errors.title ? true : false }
                                helperText={ errors.title ? errors.title : null }
                                className={ classes.textField }
                                onChange={ this.handleChange }
                                fullWidth 
                                inputProps={{ maxLength: 20 }}/>
                            {/* <TextField
                                color="secondary"
                                name='faculty'
                                type='text'
                                label='Faculty'
                                multiline
                                rows='1'
                                placeholder={ `Which student body does it concern?` }
                                className={ classes.textField }
                                onChange={ this.handleChange }
                                fullWidth /> */}
                            <Select
                                name='faculty'
                                labelId='faculty'
                                id='faculty'
                                value={this.state.faculty}
                                onChange={this.handleChange}
                                input={<Input />}>
                                    <MenuItem value=''>--</MenuItem>
                                {faculties.map(faculty => (
                                    <MenuItem key={faculty} value={faculty}> { faculty } </MenuItem>
                                ))}
                            </Select>
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

CreateForum.propTypes = {
    createForum: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});

export default connect(mapStateToProps, { createForum, clearErrors })(withStyles(styles)(withRouter(CreateForum)));
