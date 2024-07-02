import React, { Component } from 'react';
import { GridList, GridListTile, Card, CardContent, 
    Typography, Tooltip, IconButton, MenuItem, DialogActions, Dialog, 
    DialogTitle, Button, DialogContent, Select, Input } from '@material-ui/core';
import { Sort as SortIcon, FilterList as FilterListIcon } from '@material-ui/icons';
import { ForumCard } from '../components';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { getForums } from '../redux/actions/dataActions';
import { setForumExplorePage, setForumExplorePageQuery } from '../redux/actions/uiActions';
import CreateForum from '../components/forums/CreateForum';
import InfiniteScroll from 'react-infinite-scroll-component';
import ForumExploreSkeleton from '../util/skeletons/ForumExploreSkeleton';
import { faculties } from '../util/data';

const styles = (theme) => ({
    ...theme.styles
})

class forumExplore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFilter: false,
            forumReq: {
                filter: '',
                sort: "createdAt",
                limit: 15,
                dir: 'desc',
                startAfter: ''
            }
        }
    };

    /* componentDidMount() {
        this.props.setForumExplorePage();
        this.props.getForums(this.state.forumReq);
    } */

    componentDidMount = () => {
        if (this.props.match.params.query) {
            const queryParams = this.queryUrlToObj(this.props.match.params.query);
            let forumReq = this.state.forumReq;
            Object.keys(forumReq).forEach(key => {
                if (queryParams[key]) {
                    forumReq = { ...forumReq, [key]: queryParams[key] };
                }
            });
            this.setState({ forumReq: { ...forumReq }}, 
                () => {
                    if (this.props.UI.page !== 'forum-explore') {
                        this.props.setForumExplorePage();
                        this.props.getForums(this.state.forumReq);
                    };
                });
        } else {
            if (this.props.UI.page !== 'forum-explore') {
                this.props.setForumExplorePage();
                this.props.getForums(this.state.forumReq);
            };
        }
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.page === 'forum-explore-query') {
            this.props.setForumExplorePage();
            this.setState({ forumReq: { ...this.state.forumReq, startAfter: '' }}, 
                () => this.props.getForums(this.state.forumReq));
        }
        if (prevProps.match.params.query && !this.props.match.params.query) {
            this.setState({ forumReq: { sort: 'createdAt',
                startAfter: '',
                dir: 'desc', 
                limit: 15 }}, () => this.props.getForums(this.state.forumReq));
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
        Object.keys(this.state.forumReq).forEach(key => {
            if (this.state.forumReq[key] && (key !== 'startAfter' && key !== 'limit')) {
                queryUrl += String(key) + '=' + String(this.state.forumReq[key]) + '&';
            }
        });
        queryUrl = queryUrl.substring(0, queryUrl.length - 1);
        return queryUrl;
    };

    loadMoreForum = () => {
        if (this.props.data.forums) {
            this.setState({
                forumReq: {
                    ...this.state.forumReq,
                    startAfter: this.props.data.forums[this.props.data.forums.length - 1].title
                }
            }, () => this.props.getForums(this.state.forumReq));
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpenFilter = () => {
        this.setState({ openFilter: true });
    };

    handleCloseFilter = () => {
        this.setState({ openFilter: false });
    };

    handleSort = (event) => {
        this.props.setForumExplorePageQuery();
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/forums/${queryUrl}`);
        this.handleClose();
    };

    handleSortValue = (event) => {
        const values = event.target.value.split(",")
        this.setState({ forumReq: { ...this.state.forumReq, sort: values[0], dir: values[1] }});
    };

    handleFilter = (event) => {
        this.props.setForumExplorePageQuery();
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/forums/${queryUrl}`);
        this.handleCloseFilter();
    };

    handleFilterValue = (event) => {
        this.setState({ forumReq: { ...this.state.forumReq, filter: event.target.value }})
    };

    render() {
        const { classes, data: { forums, loading }} = this.props;
        let recentForumsMarkup = forums ? (
            forums.map(forum => (<GridListTile cols={1} key={forum.title}>
                    <ForumCard key={forum.title} forum={ forum } />
                </GridListTile>))
        ) : <p></p>
        const facultySelect = faculties.map(faculty => <MenuItem key={ faculty } value={ faculty }>{ faculty }</MenuItem>)
        return (
            loading ? <ForumExploreSkeleton />
            :
            <div>
                <Card style={{ marginBottom: '3%' }}>
                    <CardContent style={{ display: 'flex',  padding: 3 }}>
                        <div style={{ marginRight: 'auto' }}>
                            <Tooltip title='Sort forums' arrow >
                                <IconButton onClick={ this.handleOpen }>
                                    <SortIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <Tooltip title='Filter by faculty' arrow >
                                <IconButton onClick={ this.handleOpenFilter }>
                                    <FilterListIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                            <CreateForum history={ this.props.history }/>
                        </div>
                    </CardContent>
                </Card>
                <InfiniteScroll
                        dataLength={recentForumsMarkup.length}
                        hasMore
                        next={() => this.loadMoreForum()} />
                    <GridList cellHeight={160} className={ classes.gridList } cols={3} spacing={50}>
                        {recentForumsMarkup}
                    </GridList> 
                    <Dialog 
                        open={ this.state.open }
                        onClose={ this.handleClose }>
                        <DialogTitle>
                            Sort listings
                        </DialogTitle>
                        <DialogContent>
                            <form onSubmit={ this.handleSort } className={ classes.commentForm }>
                            <Select
                                name='sort'
                                labelId='sort-label'
                                id='sort'
                                value={`${this.state.forumReq.sort},${this.state.forumReq.dir}`}
                                onChange={ this.handleSortValue }
                                input={<Input />}
                                style={{ minWidth: 100 }}
                                inputProps={{
                                name: 'sort',
                                id: 'sort-label'
                                }}>
                                <MenuItem key={ 1 } value={ 'createdAt,desc' }>
                                    Recently created
                                </MenuItem>
                                <MenuItem key={ 2 } value={ 'updatedAt,desc' }>
                                    Recently updated
                                </MenuItem>
                                <MenuItem key={ 3 } value={ 'numOfPosts,desc' }>
                                    Most posts
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
                    <Dialog 
                        open={ this.state.openFilter }
                        onClose={ this.handleCloseFilter }>
                        <DialogTitle>
                            Filter forums by faculty
                        </DialogTitle>
                        <DialogContent>
                        <form onSubmit={ this.handleFilter }>
                        <Select
                            name='filter'
                            labelId='filter-label'
                            id='filter'
                            value={`${this.state.forumReq.filter}`}
                            onChange={ this.handleFilterValue }
                            input={<Input />}
                            style={{ minWidth: 100 }}
                            inputProps={{
                            name: 'filter',
                            id: 'filter-label'
                            }}>
                            <MenuItem key={0} value=''>None</MenuItem>
                            { facultySelect }
                        </Select>
                        </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.handleCloseFilter } style={{ textTransform: 'none' }}>
                                <Typography color="error">Cancel</Typography>
                            </Button>
                            <Button onClick={ this.handleFilter } color="secondary" style={{ textTransform: 'none' }}>
                                <Typography color="secondary">Filter</Typography>
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = {
    getForums,
    setForumExplorePage,
    setForumExplorePageQuery
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(forumExplore));
