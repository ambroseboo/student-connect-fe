import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import More from '../buttons/More';
import { Vote } from '../buttons/Vote';
import { CardContent, Typography, Avatar, ListItem } from '@material-ui/core';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { upvoteComment, downvoteComment, unUpvoteComment, unDownvoteComment } from '../../redux/actions/dataActions';

import { Link, withRouter } from 'react-router-dom';
import DeleteComment from './DeleteComment';

const styles = (theme) => ({
    ...theme.styles,
})

class CommentDisplay extends Component {
    upvotedComment = () => {
        return this.props.user.commentUpvotes && 
            this.props.user.commentUpvotes.find(upvote => upvote === this.props.comment.commentId);
    }
    downvotedComment = () => {
        return this.props.user.commentDownvotes && 
            this.props.user.commentDownvotes.find(downvote => downvote === this.props.comment.commentId);
    }
    upvoteComment = () => {
        this.props.upvoteComment(this.props.comment.commentId);
    }
    downvoteComment = () => {
        this.props.downvoteComment(this.props.comment.commentId);
    }
    unUpvoteComment = () => {
        this.props.unUpvoteComment(this.props.comment.commentId);
    }
    unDownvoteComment = () => {
        this.props.unDownvoteComment(this.props.comment.commentId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, comment : { body, username, createdAt, userImageUrl, 
            votes, commentId }, 
            user: { authenticated, credentials } } = this.props;
        const upvoteButton = authenticated ? 
            <Vote onClick={ this.upvotedComment() ? this.unUpvoteComment : this.upvoteComment }
                upvoted={ this.upvotedComment() } up={ true }/>
            :
            <Link to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                <Vote onClick={() => {}} upvoted={ false } up={ true }/>
            </Link>
        const downvoteButton = authenticated ? 
            <Vote onClick={ this.downvotedComment() ? this.unDownvoteComment : this.downvoteComment }
                upvoted={ this.downvotedComment() } up={ false }/>
            :
            <Link to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                <Vote onClick={() => {}} upvoted={ false } up={ false }/>
            </Link>
        return (
            <div>
                <ListItem className={ classes.commentList }>
                    <CardContent className={ classes.comment } style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <div className={ classes.commenterDisplay }>
                            <Avatar style={{ width: 30, height: 30}} src={ userImageUrl } className={ classes.commenterDisplayChild}></Avatar> 
                            <div className={ classes.commenterDisplayChild}> 
                                <Typography variant="body1" >
                                    { username }&nbsp; <Typography variant="caption" color="textSecondary">
                                    { dayjs(createdAt).fromNow() }
                                </Typography>
                                </Typography>
                            </div>
                        </div>
                        <Typography className={classes.commentBody} variant="body1">
                            { body }
                        </Typography>
                        <div className={ classes.commentVotes }> 
                            { upvoteButton }
                            <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '1%' }} className={ classes.commentVotesNumber}>
                                { votes }
                            </Typography>
                            { downvoteButton }
                        </div>
                    </CardContent>
                    <CardContent>
                        <More authenticated={ authenticated } 
                            username={ username } 
                            credentials={ credentials }
                            deleteComponent={<DeleteComment commentId={ commentId }/>} />
                    </CardContent>
                </ListItem>
            </div>
        )
    }
}

CommentDisplay.propTypes = {
    user: PropTypes.object.isRequired,
    upvoteComment: PropTypes.func.isRequired,
    downvoteComment: PropTypes.func.isRequired,
    unUpvoteComment: PropTypes.func.isRequired,
    unDownvoteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

const mapActionsToProps = {
    upvoteComment,
    downvoteComment,
    unUpvoteComment,
    unDownvoteComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(CommentDisplay)));