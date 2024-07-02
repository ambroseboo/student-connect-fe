import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import DeleteGroupPostInPost from './DeleteGroupPostInPost';
import { Vote } from '../buttons/Vote';
import More from '../buttons/More';
import { Card, CardContent, Typography, Avatar, Divider, Button } from '@material-ui/core';
import { ModeCommentOutlined as CommentOutlined } from '@material-ui/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { upvoteGroupPost, downvoteGroupPost, unUpvoteGroupPost, unDownvoteGroupPost } from '../../redux/actions/dataActions';

import { Link, withRouter } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.styles,
})

class GroupPostComponent extends Component {
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
        this.props.upvoteGroupPost(this.props.post.postId);
    }
    downvotePost = () => {
        this.props.downvoteGroupPost(this.props.post.postId);
    }
    unUpvotePost = () => {
        this.props.unUpvoteGroupPost(this.props.post.postId);
    }
    unDownvotePost = () => {
        this.props.unDownvoteGroupPost(this.props.post.postId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, post : { title, body, username, createdAt, userImageUrl, 
            votes, commentCount, postId, group, userId }, 
            user: { authenticated, credentials }, members
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
        const isMod = members ? members.findIndex(member => member.userId 
            === credentials.userId && member.role !== 'member') >= 0 : false;
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
                            <Typography className={ classes.postForum } variant="caption"><Link to={`/groups/${group}`}>Posted in /{ group }</Link></Typography>
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
                            isMod={ isMod }
                            deleteComponent={ <DeleteGroupPostInPost postId={ postId } history={ this.props.history }/> }/>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

GroupPostComponent.propTypes = {
    user: PropTypes.object.isRequired,
    upvoteGroupPost: PropTypes.func.isRequired,
    downvoteGroupPost: PropTypes.func.isRequired,
    unUpvoteGroupPost: PropTypes.func.isRequired,
    unDownvoteGroupPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    members: state.data.info.members
});

const mapActionsToProps = {
    upvoteGroupPost,
    downvoteGroupPost,
    unUpvoteGroupPost,
    unDownvoteGroupPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(GroupPostComponent)));