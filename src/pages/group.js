import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { setGroupPage, setGroupPageQuery } from '../redux/actions/uiActions';
import { getGroupInfo, getGroupPosts } from '../redux/actions/dataActions';
import { Card, CardContent, Typography, Grid, Tooltip, IconButton,
    MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Select, Input } from '@material-ui/core';
import { GroupPostDisplay, CreateGroupPost, ViewMembers, AddMember } from '../components';
import { Sort as SortIcon } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ForumSkeleton from '../util/skeletons/ForumSkeleton';
import { Fragment } from 'react';

const styles = (theme) => ({
    ...theme.styles
})

class group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            postReq: {
                sort: "createdAt",
                startAfter: "",
                dir: "desc"
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
                    const groupId = this.props.match.params.groupId;
                    if (this.props.UI.page !== groupId) {
                        this.props.setGroupPage(groupId);
                        this.props.getGroupInfo(groupId);
                        this.props.getGroupPosts(groupId, this.state.postReq);
                    }
                });
        } else {
            const groupId = this.props.match.params.groupId;
            if (this.props.UI.page !== groupId) {
                this.props.setGroupPage(groupId);
                this.props.getGroupInfo(groupId);
                this.props.getGroupPosts(groupId, this.state.postReq);
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
        if (this.props.UI.page === `group-query`) {
            const groupId = this.props.match.params.groupId;
            this.props.setGroupPage(groupId);
            this.setState({ postReq: { ...this.state.postReq, startAfter: '' }}, 
                () => this.props.getGroupPosts(groupId, this.state.postReq));
        }
        if (prevProps.match.params.query && !this.props.match.params.query) {
            const groupId = this.props.match.params.groupId;
            this.setState({ postReq: { sort: 'createdAt',
                startAfter: '',
                dir: 'desc' }}, () => this.props.getGroupPosts(groupId, this.state.postReq));
        }
    };

    fetchPostData = () => {
        if (this.props.data.posts) {
            this.setState({
                postReq: {
                    ...this.state.postReq,
                    startAfter: this.props.data.posts[this.props.data.posts.length - 1].postId
                }
            }, () => this.props.getGroupPosts(this.props.match.params.groupId, this.state.postReq));
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSort = (event) => {
        const groupId = this.props.match.params.groupId
        this.props.setGroupPageQuery(groupId);
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/groups/${groupId}/${queryUrl}`);
        this.handleClose();
    };

    handleSortValue = (event) => {
        const values = event.target.value.split(",")
        this.setState({ postReq: { ...this.state.postReq, sort: values[0], dir: values[1] }});
    };

    render() {
        const { data: { loading, info: { title, ownerId }, posts }, 
            user: { credentials: { userId }}} = this.props;
        const postMarkup = posts.length > 0 ? posts.map(post => 
            <GroupPostDisplay key={ post.postId } post={ post } />)
            : [<Card key='0'><CardContent style={{ textAlign: 'center' }}>
            <Typography variant='body1'>Currently, there are no posts in this group</Typography>
        </CardContent></Card>]
        const addMember = ownerId === userId ? <AddMember groupId={ title } /> : null
        return (
            loading ?
                <ForumSkeleton />
                :
                <Fragment>
                    <Grid container spacing={10} justify='flex-end'>
                        <Grid item sm />
                        <Grid item sm={8} xs={12}>
                            <div>
                                <Card>
                                <CardContent style={{ display: 'flex' }}>
                                    <div>
                                        <Typography variant='h5'>
                                            { title }
                                        </Typography>
                                    </div>
                                    <div style={{ marginLeft: 'auto' }}>
                                        { addMember }
                                        <ViewMembers />
                                    </div>
                                </CardContent>
                            </Card>
                            </div>
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
                                        <CreateGroupPost id={ title }/>
                                    </div>
                                </CardContent>
                            </Card>
                            <br />
                            <InfiniteScroll
                                dataLength={postMarkup.length}
                                next={() => this.fetchPostData()}
                                hasMore={true}>
                                { postMarkup }
                            </InfiniteScroll>
                        </Grid>
                        <Grid item sm />
                    </ Grid>
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
                </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
    user: state.user
});

const mapActionsToProps = {
    setGroupPage,
    getGroupInfo,
    getGroupPosts,
    setGroupPageQuery
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(group));
