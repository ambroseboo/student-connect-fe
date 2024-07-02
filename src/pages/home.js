import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { ForumDisplay, PostDisplay } from '../components';
import { List, Typography, Card, Button, CardContent, ListItem,
    Input, MenuItem, DialogActions, Dialog, DialogTitle, DialogContent, 
    Select, Tooltip, IconButton } from '@material-ui/core';
import { Sort as SortIcon } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { getPosts, getForums } from '../redux/actions/dataActions';
import { setHomePage, setHomePageQuery } from '../redux/actions/uiActions';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomeSkeleton from '../util/skeletons/HomeSkeleton';

const styles = (theme) => ({
    ...theme.styles
})

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            postReq: {
                sort: "createdAt",
                dir: "desc",
                startAfter: ''
            },
            forumReq: {
                sort: "updatedAt",
                limit: 5
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
                    if (this.props.UI.page !== 'home') {
                        this.props.setHomePage();
                        this.props.getPosts(this.state.postReq);
                        this.props.getForums(this.state.forumReq);
                    };
                });
        } else {
            if (this.props.UI.page !== 'home') {
                this.props.setHomePage();
                this.props.getPosts(this.state.postReq);
                this.props.getForums(this.state.forumReq);
            };
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.page === 'home-query') {
            this.props.setHomePage();
            this.setState({ postReq: { ...this.state.postReq, startAfter: '' }}, 
                () => this.props.getPosts(this.state.postReq));
        }
        if (prevProps.match.params.query && !this.props.match.params.query) {
            this.setState({ postReq: { sort: 'createdAt',
                startAfter: '',
                dir: 'desc' }}, () => this.props.getPosts(this.state.postReq));
        }
    };

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
    
    fetchPostData() {
        if (this.props.data.posts) {
            this.setState({
                postReq: {
                    ...this.state.postReq,
                    startAfter: this.props.data.posts[this.props.data.posts.length - 1].postId
                }
            }, () =>  this.props.getPosts(this.state.postReq));
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSort = (event) => {
        this.props.setHomePageQuery();
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/home/${queryUrl}`);
        this.handleClose();
    };

    handleSortValue = (event) => {
        const values = event.target.value.split(",")
        this.setState({ postReq: { ...this.state.postReq, sort: values[0], dir: values[1] }});
    };

    render() {
        const { classes, data: { posts, forums, loading } } = this.props;
        let recentForumsMarkup = forums ? (
            forums.map(forum => <ForumDisplay key={forum.title} forum={ forum } />)
        ) : <p></p>

        let recentPostsMarkup = posts ? (
            posts.map(post => <PostDisplay key={post.postId} post={ post } />)
        ) : <p></p>

        return (
            loading ? 
            <HomeSkeleton /> :
            <div>
                <Grid container spacing={10} justify='flex-end'>
                    <Grid item sm={8} xs={12}>
                        <Card>
                            <div style={{ marginLeft: 'auto' }}>
                                <Tooltip title='Sort posts' arrow >
                                    <IconButton onClick={ this.handleOpen }>
                                        <SortIcon color='secondary' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Card>
                        <br />
                        <InfiniteScroll
                            dataLength={recentPostsMarkup.length}
                            next={() => this.fetchPostData()}
                            hasMore={true}
                            loader={<Card><CardContent></CardContent></Card>}>
                            {recentPostsMarkup}
                        </InfiniteScroll>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Card>
                            <br />
                            <List className={ classes.list } style={{ padding:'0px 0px 0px 0px' }}>
                                <ListItem className={ classes.forumDisplayList }>
                                    <Typography p={2} variant='h6' className={ classes.forumHeader } color="textPrimary">
                                        Forums
                                    </Typography>
                                </ListItem>
                                {recentForumsMarkup}
                                <Button className={ classes.forumDisplayList } 
                                    component={ Link } 
                                    to={`/forums`}>
                                    <ListItem className={ classes.listItem }>
                                        <Typography variant='body1' color='textSecondary'>View more forums</Typography>    
                                    </ListItem>
                                </Button>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
                <Dialog 
                    open={ this.state.open }
                    onClose={ this.handleClose }>
                    <DialogTitle>
                        Sort posts
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={ this.handleSort } className={ classes.commentForm }>
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
        );
    }
}

home.propTypes = {
    data: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    getForums: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = {
    getForums,
    getPosts,
    setHomePage,
    setHomePageQuery
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));