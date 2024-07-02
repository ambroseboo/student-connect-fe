import { CardMedia, Dialog, Card, DialogContent } from '@material-ui/core'
import React, { Component, Fragment } from 'react'

export class DisplayImage extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { imageUrl } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardMedia 
                        style={{ height: '500px', maxWidth: '1000px' }}
                        image={ imageUrl }
                        title='listing-image' 
                        onClick={ this.handleOpen } />
                    
                </Card>
                <Dialog
                    open={ this.state.open }
                    onClose={ this.handleClose }
                    fullWidth
                    maxWidth={ 'xl' } >
                    <DialogContent style={{ textAlign: 'center' }}>
                        <img src={ imageUrl } alt={ 'listing' } ></img>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

export default DisplayImage
