import React, { Component } from 'react';
import { PostComponent, CommentComponent } from '../components';
import { Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import PostSkeleton from '../util/skeletons/PostSkeleton';
import CommentSkeleton from '../util/skeletons/CommentSkeleton';

const styles = (theme) => ({
    ...theme.styles
})

class post extends Component {

    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.getPost(postId);
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.match.params.postId !== prevProps.match.params.postId) 
            this.props.getPost(this.props.match.params.postId)
    }

    render() {
        const { data: { post, comments }, loading } = this.props;
        let postDisplay = <PostComponent key={post.postId} post={ post } comments={ comments } />;
        return (
            loading ? <div>
                 <Grid container spacing={10} justify='flex-end'>
                    <Grid item sm />
                    <Grid item sm={8} xs={12}>
                        <PostSkeleton />
                        <CommentSkeleton />
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
            :
            <div>
                <Grid container spacing={10} justify='flex-end'>
                    <Grid item sm />
                    <Grid item sm={8} xs={12}>
                        { postDisplay }
                        <CommentComponent comments={ comments } postId={ post.postId } />
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        )
    }
}

post.propTypes = {
    getPost: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    loading: state.UI.loading
})

export default connect(mapStateToProps, { getPost })(withStyles(styles)(post));
