import React, { Component } from 'react';
import { PostDisplay, CommentDisplay } from '../components';
import { Dialog, DialogContent, DialogTitle, CircularProgress, Grid, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

const styles = (theme) => ({
    ...theme.styles
})

class PostDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postId)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes, data: { post, comments } } = this.props;
        let postDisplay = <PostDisplay key={post.postId} post={ post } />;
        let commentDisplay = comments ? (comments.map(comment => <CommentDisplay key={comment.commentId} comment={ comment }/>)) 
            : <p></p>
        return (
            <div>
                
            </div>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getPost })(withStyles(styles)(PostDialog));
