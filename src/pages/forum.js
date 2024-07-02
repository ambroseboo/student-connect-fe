import React, { Component } from 'react';
import { PostDisplay } from '../components';
import { Card, Grid, CardContent, Typography, Dialog, Select,
    DialogActions, DialogTitle, Input, MenuItem, Button, DialogContent,
    Tooltip, IconButton } from '@material-ui/core';
import { Sort as SortIcon } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { getForumPosts, followForum, unfollowForum } from '../redux/actions/dataActions';
import { setForumPage, setForumPageQuery } from '../redux/actions/uiActions';
import PropTypes from 'prop-types';
import CreatePost from '../components/posts/CreatePost';
import { Follow } from '../components/buttons/Follow';
import { Link } from 'react-router-dom';
import ForumSkeleton from '../util/skeletons/ForumSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = (theme) => ({
    ...theme.styles
})

class forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            postReq: {
                sort: "createdAt",
                dir: "desc",
                startAfter: ""
            }
        }
    }

    componentDidMount = () => {
        if (this.props.match.params.query) {
            const queryParams = this.queryUrlToObj(this.props.match.params.query);
            let postReq = this.state.postReq;
            Object.keys(postReq).forEach(key => {
                if (queryParams[key]) {
                    postReq = { ...postReq, [key]: queryParams[key] };
                }
            });
            this.setState({ postReq: { ...postReq }}, 
                () => {
                    const forumId = this.props.match.params.forumId;
                    if (this.props.UI.page !== forumId) {
                        this.props.setForumPage(forumId)
                        this.props.getForumPosts(forumId, this.state.postReq);
                    }
                });
        } else {
            const forumId = this.props.match.params.forumId;
            if (this.props.UI.page !== forumId) {
                this.props.setForumPage(forumId)
                this.props.getForumPosts(forumId, this.state.postReq);
            }
        }
    }

    queryUrlToObj = (queryString) => {
        const queries = queryString.split('&');
        let queryParams = {};
        queries.forEach(query => {
            const [key, val] = query.split('=')
            queryParams = { ...queryParams, [key]: val };
        });
        return queryParams;
    };

    stateToQueryUrl = () => {
        let queryUrl = '';
        Object.keys(this.state.postReq).forEach(key => {
            if (this.state.postReq[key] && key !== 'startAfter') {
                queryUrl += String(key) + '=' + String(this.state.postReq[key]) + '&';
            }
        });
        queryUrl = queryUrl.substring(0, queryUrl.length - 1);
        return queryUrl;
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.page === `forum-query`) {
            const forumId = this.props.match.params.forumId;
            this.props.setForumPage(forumId);
            this.setState({ postReq: { ...this.state.postReq, startAfter: '' }}, 
                () => this.props.getForumPosts(forumId, this.state.postReq));
        }
        if (prevProps.match.params.query && !this.props.match.params.query) {
            const forumId = this.props.match.params.forumId;
            this.setState({ postReq: { sort: 'createdAt',
                startAfter: '',
                dir: 'desc' }}, () => this.props.getForumPosts(forumId, this.state.postReq));
        }
    };

    fetchPostData = () => {
        if (this.props.data.posts) {
            this.setState({
                postReq: {
                    ...this.state.postReq,
                    startAfter: this.props.data.posts[this.props.data.posts.length - 1].postId
                }
            }, () => this.props.getForumPosts(this.props.match.params.forumId, this.state.postReq));
        }
    }

    follow = (forumId) => {
        this.props.followForum(forumId);
    }

    unfollow = (forumId) => {
        this.props.unfollowForum(forumId);
    }

    followedForum = () => {
        return this.props.user.forumFollows && 
            this.props.user.forumFollows.find(forum => forum === this.props.data.info.title);
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSort = (event) => {
        const forumId = this.props.match.params.forumId
        this.props.setForumPageQuery(forumId);
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/forums/forum/${forumId}/${queryUrl}`);
        this.handleClose();
    };

    handleSortValue = (event) => {
        const values = event.target.value.split(",")
        this.setState({ postReq: { ...this.state.postReq, sort: values[0], dir: values[1] }});
    };

    render() {
        const { data: { info, posts, loading }, user: { authenticated } } = this.props;
        let forumPostsMarkup = posts.length > 0 ? (
            posts.map(post => <PostDisplay key={post.postId} post={ post } />)
            ) : [<Card key='0'><CardContent style={{ textAlign: 'center' }}>
                    <Typography variant='body1'>Currently, there are no posts in this forum</Typography>
                </CardContent></Card>];
        console.log(this.state.postReq);
        const followButton = authenticated ? 
        <Follow onClick={ this.followedForum() ? () => this.unfollow(info.title) : () => this.follow(info.title) }
            followed={ this.followedForum() }/>
        :
        <Link to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
            <Follow onClick={() => {}} followed={ false }/>
        </Link>
        return (
            loading ? <div>
                <ForumSkeleton />
            </div>
            :
            <div>
                <Grid container spacing={10} justify='flex-end'>
                    <Grid item sm />
                    <Grid item sm={8} xs={12}>
                        <div>
                            <Card>
                            <CardContent style={{ display: 'flex' }}>
                                <div>
                                    <Typography variant='h5'>
                                        { info.title }
                                    </Typography>
                                    <Typography variant='body2'>
                                        { info.faculty }
                                    </Typography>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    { followButton }
                                </div>
                            </CardContent>
                        </Card>
                        <br />
                        <Card>
                            <CardContent style={{ display: 'flex', padding: '0px 10px 0px 0px' }}>
                                <div style={{ marginRight: 'auto' }}>
                                    <Tooltip title='Sort posts' arrow >
                                        <IconButton onClick={ this.handleOpen }>
                                            <SortIcon color='secondary' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <CreatePost id={ info.title }/>
                                </div>
                            </CardContent>
                        </Card>
                        <br />
                        <InfiniteScroll
                            dataLength={forumPostsMarkup.length}
                            next={() => this.fetchPostData()}
                            hasMore={true}>
                            {forumPostsMarkup} 
                        </InfiniteScroll>
                        </div>
                    </Grid>
                    <Grid item sm />
                </Grid>
                <Dialog 
                    open={ this.state.open }
                    onClose={ this.handleClose }>
                    <DialogTitle>
                        Sort posts
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={ this.handleSort }>
                        <Select
                            name='sort'
                            labelId='sort-label'
                            id='sort'
                            value={`${this.state.postReq.sort},${this.state.postReq.dir}`}
                            onChange={ this.handleSortValue }
                            input={<Input />}
                            style={{ minWidth: 100 }}
                            inputProps={{
                            name: 'sort',
                            id: 'sort-label'
                            }}>
                            <MenuItem key={ 1 } value={ 'createdAt,desc' }>
                                Recent
                            </MenuItem>
                            <MenuItem key={ 2 } value={ 'commentCount,desc' }>
                                Most commented
                            </MenuItem>
                            <MenuItem key={ 3 } value={ 'votes,desc' }>
                                Most upvoted
                            </MenuItem>
                        </Select>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } style={{ textTransform: 'none' }}>
                            <Typography color="error">Cancel</Typography>
                        </Button>
                        <Button onClick={ this.handleSort } color="secondary" style={{ textTransform: 'none' }}>
                            <Typography color="secondary">Sort</Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

forum.propTypes = {
    getForumPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    getForumPosts,
    followForum,
    unfollowForum,
    setForumPage,
    setForumPageQuery
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(forum));
