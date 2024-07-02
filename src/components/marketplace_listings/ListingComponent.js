import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import DisplayImage from './DisplayImage';
import DeleteListingInListing from './DeleteListingInListing';
import More from '../buttons/More';
import { Card, CardContent, Typography, Avatar, Divider, Button, Tooltip } from '@material-ui/core';
import { ModeCommentOutlined as CommentOutlined } from '@material-ui/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { upvotePost, downvotePost, unUpvotePost, unDownvotePost } from '../../redux/actions/dataActions';

import { Link, withRouter } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.styles,
})

class ListingComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, post : { body, username, createdAt, userImageUrl, 
            imageUrl, commentCount, postId, price, userId, title, module }, 
            user: { authenticated, credentials }} = this.props;
        return (
            <div>
                <DisplayImage imageUrl={ imageUrl }/>
                <Card className={ classes.card } >
                    <CardContent className={classes.content} style={{ maxHeight: '500px' }}>
                        <div className={classes.posterDisplay}>
                            <Avatar src={ userImageUrl } className={ classes.posterDisplayChild}></Avatar> 
                            <div className={ classes.posterDisplayChild}> 
                                <Typography className={ classes.posterDisplayChildTextTop} variant="h6" >
                                    <Link to={`/users/${userId}`}>{ username } </Link>
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    { dayjs(createdAt).fromNow() }
                                </Typography>
                            </div>
                            <Typography className={ classes.postForum } variant="caption">For { module }</Typography>
                        </div>
                        <Typography className={classes.postTitle} variant="h5">
                            ${ price } &nbsp;{'\u26AC'}&nbsp; { title }
                        </Typography>
                        <Typography paragraph className={classes.postBody} variant="body1">
                            { body }
                        </Typography>
                        <Divider />
                        <div style={{ display: 'flex' }}>
                        <Tooltip title='View comments' arrow>
                            <Button><CommentOutlined style={{ fontSize: 20 }}/><Typography variant="subtitle2"> 
                                &nbsp;{ commentCount } Comments</Typography>
                            </Button>
                        </Tooltip>
                        &nbsp;&nbsp;&nbsp;
                        </div>
                    </CardContent>
                    <CardContent>
                        <More authenticated={ authenticated } 
                            username={ username } 
                            credentials={ credentials }
                            postId={ postId }
                            deleteComponent={<DeleteListingInListing postId={ postId } history={ this.props.history } />} />
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ListingComponent.propTypes = {
    user: PropTypes.object.isRequired,
    upvotePost: PropTypes.func.isRequired,
    downvotePost: PropTypes.func.isRequired,
    unUpvotePost: PropTypes.func.isRequired,
    unDownvotePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    upvotePost,
    downvotePost,
    unUpvotePost,
    unDownvotePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(ListingComponent)));