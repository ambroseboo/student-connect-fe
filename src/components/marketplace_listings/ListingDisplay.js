import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import More from '../buttons/More';
import { Card, CardContent, Typography, Avatar, Divider, Button, Tooltip, CardMedia, CardHeader } from '@material-ui/core';
import { ModeCommentOutlined as CommentOutlined } from '@material-ui/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import DeleteListing from './DeleteListing';

const styles = (theme) => ({
    ...theme.styles,
})

class ListingDisplay extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, post : { price, username, createdAt, userImageUrl, 
            imageUrl, commentCount, postId, module, title, userId }, 
            user: { authenticated, credentials }} = this.props;
        return (
            <Card>
                <CardHeader
                    action={
                        <More authenticated={ authenticated } 
                            username={ username } 
                            credentials={ credentials }
                            postId={ postId }
                            deleteComponent={<DeleteListing postId={ postId } />} />
                    } 
                    avatar={
                        <Avatar src={ userImageUrl } 
                            component={ Link } to={ `/users/${ userId }` } /> 
                    }
                    title={ 
                        <Typography variant='h5' 
                            component={ Link } to={`/marketplace/listings/${postId}`}>
                            { title }</Typography>
                    }
                    subheader={ dayjs(createdAt).fromNow() } />
                <CardMedia 
                    className={ classes.media }
                    style={{ marginBottom: 0 }}
                    image={ imageUrl } 
                    title='Post image' 
                    component={ Link } 
                    to={`/marketplace/listings/${postId}`}/>
                <CardContent style={{ paddingBottom: '1%' }}>
                    <Typography variant="h5" style={{ marginBottom: '1%' }}>
                        ${ price }
                    </Typography>
                    <Typography variant="subtitle2" style={{ marginBottom: '1%' }}>
                        For { module }
                    </Typography>
                    <Divider />
                    <div style={{ display: 'flex', marginBottom: '0' }}>
                    <Tooltip title='View comments' arrow>
                        <Button component={ Link } to={`/marketplace/listings/${postId}`}><CommentOutlined style={{ fontSize: 20 }}/><Typography variant="subtitle2"> 
                            &nbsp;{ commentCount } Comments</Typography>
                        </Button>
                    </Tooltip>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

ListingDisplay.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(ListingDisplay)));