import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import DeletePostInPost from './DeletePostInPost';
import { Vote } from '../buttons/Vote';
import More from '../buttons/More';
import { Card, CardContent, Typography, Avatar, Divider, Button } from '@material-ui/core';
import { ModeCommentOutlined as CommentOutlined } from '@material-ui/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { upvotePost, downvotePost, unUpvotePost, unDownvotePost } from '../../redux/actions/dataActions';

import { Link, withRouter } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.styles,
})

class PostComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }
    upvotedPost = () => {
        return this.props.user.upvotes && 
            this.props.user.upvotes.find(upvote => upvote === this.props.post.postId);
    }
    downvotedPost = () => {
        return this.props.user.downvotes && 
            this.props.user.downvotes.find(downvote => downvote === this.props.post.postId);
    }
    upvotePost = () => {
        this.props.upvotePost(this.props.post.postId);
    }
    downvotePost = () => {
        this.props.downvotePost(this.props.post.postId);
    }
    unUpvotePost = () => {
        this.props.unUpvotePost(this.props.post.postId);
    }
    unDownvotePost = () => {
        this.props.unDownvotePost(this.props.post.postId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, post : { title, body, username, createdAt, userImageUrl, 
            votes, commentCount, postId, forum, userId }, 
            user: { authenticated, credentials },
            } = this.props;
        const upvoteButton = authenticated ? 
            <Vote onClick={ this.upvotedPost() ? this.unUpvotePost : this.upvotePost }
                upvoted={ this.upvotedPost() } up={ true }/>
            :
            <Link to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                <Vote onClick={() => {}} upvoted={ false } up={ true }/>
            </Link>
        const downvoteButton = authenticated ? 
            <Vote onClick={ this.downvotedPost() ? this.unDownvotePost : this.downvotePost }
                upvoted={ this.downvotedPost() } up={ false }/>
            :
            <Link to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                <Vote onClick={() => {}} upvoted={ false } up={ false }/>
            </Link>
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content} style={{ maxHeight: '500px' }}>
                        <div className={classes.posterDisplay}>
                            <Avatar src={ userImageUrl } className={ classes.posterDisplayChild} component={ Link } to={`/users/${userId}`}></Avatar> 
                            <div className={ classes.posterDisplayChild}> 
                                <Typography
                                    className={ classes.posterDisplayChildTextTop} variant="h6" >
                                    <Link to={`/users/${userId}`}>{ username }</Link>
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    { dayjs(createdAt).fromNow() }
                                </Typography>
                            </div>
                            <Typography className={ classes.postForum } variant="caption"><Link to={`/forums/forum/${forum}`}>Posted in /{ forum }</Link></Typography>
                        </div>
                        <Typography className={classes.postTitle} variant="h5">
                            { title }
                        </Typography>
                        <Typography paragraph className={classes.postBody} variant="body1">
                            { body }
                        </Typography>
                        <Divider />
                        <div style={{ display: 'flex' }}>
                        <Button>
                        <CommentOutlined style={{ fontSize: 20 }}/><Typography variant="subtitle2"> 
                            &nbsp;{ commentCount } Comments</Typography>
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        { upvoteButton }
                        <Typography variant="h6" style={{ textAlign: 'center', marginTop: '1.3%' }}>{ votes }</Typography>
                        <div>{ downvoteButton }</div>
                        </div>
                    </CardContent>
                    <CardContent>
                        <More authenticated={ authenticated } 
                            username={ username } 
                            credentials={ credentials }
                            postId={ postId }
                            deleteComponent={ <DeletePostInPost postId={ postId } history={ this.props.history }/> }/>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

PostComponent.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(PostComponent)));