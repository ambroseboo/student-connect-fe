import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// MUI
import { IconButton, Button, TextField, Dialog, 
    DialogContent, DialogTitle, CircularProgress, Tooltip, Typography } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { createMarketplaceListings, clearErrors } from '../../redux/actions/dataActions';
import NumberFormat from 'react-number-format';

const styles = (theme) => ({
    ...theme.styles
})

class CreateListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            title: '',
            body: '',
            errors: {},
            price: '0',
            module: '',
            image: null,
            imageUrl: ''
        };
    }

    handleImageChange = (event) => {
        const binaryData = event.target.files;
        this.setState({ image: binaryData[0] });
        const imageUrl = URL.createObjectURL(new Blob(binaryData, { type: binaryData[0].type }));
        this.setState({ imageUrl: imageUrl })
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors })
        }
        if (prevProps.UI.errors || prevProps.UI.loading) {
            if (!this.props.UI.errors && !this.props.UI.loading) {
                this.setState({ title: '', 
                    body: '', 
                    price: '0', 
                    module: '', 
                    image: {}, 
                    imageUrl: '' 
                });
                this.handleClose();
            }
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {}, image: null, imageUrl: '' });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handlePrice = ({ __, value }) => {
        this.setState({ price: value });
    } 

    handleModule = (event) => {
        this.setState({ module: event.target.value.toUpperCase() })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (this.state.image) formData.append('image', this.state.image, this.state.image.name);
        if (this.state.body) formData.append('body', this.state.body);
        if (this.state.title) formData.append('title', this.state.title);
        if (this.state.price) formData.append('price', this.state.price);
        if (this.state.module) formData.append('module', this.state.module);
        this.props.createMarketplaceListings(formData);
    }

    render() {
        const { errors, imageUrl } = this.state;
        const { classes, UI: { loading }, user: { credentials: { username }, authenticated }} = this.props;
        return (
            <Fragment>
                <Tooltip title='Create a listing' arrow>
                    { authenticated ? 
                    (<IconButton onClick={ this.handleOpen }>
                        <AddIcon color='secondary' />
                    </IconButton>) : 
                    (<IconButton component={ Link } 
                        to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                        <AddIcon color='secondary'/>
                    </IconButton>)}              
                    
                </Tooltip>
                <Dialog open={ this.state.open } 
                    onClose={ this.handleClose } 
                    fullWidth maxWidth='sm'>
                    <IconButton onClick={ this.handleClose } className={ classes.closeButton }>
                        <CloseIcon color='secondary' />
                    </IconButton>
                    <DialogTitle>Create a new listing</DialogTitle>
                    <DialogContent>
                        <form onSubmit={ this.handleSubmit }>
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={ this.handleImageChange }
                            />
                            <Tooltip title='Add an image' arrow>
                                <Button onClick={ this.handleEditPicture }>
                                    { imageUrl ? 
                                        <img src={ imageUrl } alt="post display" type='file' className={ classes.image } />
                                        : <AddIcon color="secondary" />
                                    }              
                                </Button>
                            </Tooltip>
                            <TextField
                                name='title'
                                type='text'
                                label='Post title'
                                multiline
                                rows='1'
                                placeholder={ `What is this item?`}
                                error={ errors.title ? true : false }
                                helperText={ errors.title ? errors.title : null }
                                className={ classes.textField }
                                onChange={ this.handleChange }
                                fullWidth 
                                color="secondary"/>
                            <TextField
                                name='body'
                                type='text'
                                label='Post body'
                                multiline
                                rows='2'
                                rowsMax='8'
                                placeholder={ `Enter a brief desciption, ${username}!`}
                                error={ errors.body ? true : false }
                                helperText={ errors.body ? errors.body : null }
                                className={ classes.textField }
                                onChange={ this.handleChange }
                                fullWidth 
                                color="secondary"/>
                            <div style={{ display: 'flex' }}>
                            <NumberFormat 
                                prefix={'$'}
                                name='price'
                                value={ this.state.price }
                                customInput={ TextField }
                                onValueChange={ this.handlePrice }
                                label='Price'
                                rows='1'
                                placeholder={ `What is the listed price?`}
                                error={ errors.price ? true : false }
                                helperText={ errors.price ? errors.price : null }
                                className={ classes.textField }
                                color='secondary'
                                style={{ marginLeft: 0 }}
                            />
                            <TextField
                                name='module'
                                type='text'
                                label='Module'
                                multiline
                                rows='1'
                                placeholder={ `Enter an accurate module code`}
                                error={ errors.module ? true : false }
                                helperText={ errors.module ? errors.module : null }
                                className={ classes.textField }
                                onChange={ this.handleModule }
                                color="secondary"
                                style={{ width: '50%' }}/>
                            </div>
                        <div style={{ display: 'flex' }}>
                        {(errors.imageUrl) && (
                            <Typography variant="body2" className={classes.customError}>
                                <br />
                                {errors.imageUrl} <br/>
                            </Typography>
                        )}
                            <Button type="submit" variant="outlined" color="secondary"
                                className={ classes.submitButton } disabled={ loading }
                                style={{ marginBottom: '2%', marginLeft: 'auto' }}>
                                Submit
                                { loading &&
                                    (<CircularProgress 
                                        size={ 30 } 
                                        className={ classes.progress }/>) }
                                </Button>
                        </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CreateListing.propTypes = {
    createMarketplaceListings: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});

const mapActionsToProps = {
    createMarketplaceListings, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(CreateListing)));
