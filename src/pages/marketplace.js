import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMarketplaceListings } from '../redux/actions/dataActions';
import { setMarketplacePage, setMarketplacePageQuery } from '../redux/actions/uiActions';
import { ListingDisplay } from '../components';
import { withStyles, Card, CardContent, Typography, 
    GridList, GridListTile, IconButton, Tooltip, DialogContent, DialogTitle,
    Dialog, Button, DialogActions,
    TextField, Select, Input,
    MenuItem } from '@material-ui/core';
import { CreateListing } from '../components';
import { Search as SearchIcon, Sort as SortIcon } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import MarketplaceSkeleton from '../util/skeletons/MarketplaceSkeleton';

const styles = (theme) => ({
    ...theme.styles
});

class marketplace extends Component {
    state = {
        open: false,
        openSortMenu: false,
        postReq: {
            filter: '',
            sort: 'createdAt',
            startAfter: '',
            dir: 'desc'
        }
    };

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
                    if (this.props.UI.page !== 'marketplace') {
                        this.props.setMarketplacePage();
                        this.props.getMarketplaceListings(this.state.postReq);
                    };
                });
        } else {
            if (this.props.UI.page !== 'marketplace') {
                this.props.setMarketplacePage();
                this.props.getMarketplaceListings(this.state.postReq);
            };
        }
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.UI.page === 'marketplace-query') {
            this.props.setMarketplacePage();
            this.setState({ postReq: { ...this.state.postReq, startAfter: '' }}, 
                () => this.props.getMarketplaceListings(this.state.postReq));
        }
        if (prevProps.match.params.query && !this.props.match.params.query) {
            this.setState({ postReq: { filter: '',
                sort: 'createdAt',
                startAfter: '',
                dir: 'desc' }}, () => this.props.getMarketplaceListings(this.state.postReq));
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
            })
            this.props.getMarketplaceListings(this.state.postReq);
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpenSort = () => {
        this.setState({ openSortMenu: true });
    };

    handleCloseSort = () => {
        this.setState({ openSortMenu: false });
    };

    handleSearch = (event) => {
        this.props.setMarketplacePageQuery();
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/marketplace/${queryUrl}`);
        this.handleClose();
    };

    handleSortValue = (event) => {
        const values = event.target.value.split(",")
        this.setState({ postReq: { ...this.state.postReq, sort: values[0], dir: values[1] }});
    };

    handleModuleCode = (event) => {
        this.setState({ postReq: { ...this.state.postReq, filter: event.target.value.toUpperCase() }})
    };

    handleSort = (event) => {
        this.props.setMarketplacePageQuery();
        const queryUrl = this.stateToQueryUrl();
        this.props.history.push(`/marketplace/${queryUrl}`);
        this.handleCloseSort();
    };

    render() {
        const { classes, data: { posts, loading }} = this.props;
        const listingMarkup = posts ? (
            posts.map(post => <GridListTile cols={1} key={post.postId} style={{ height: 500 }}>
                <ListingDisplay key={ post.postId } post={ post }/></GridListTile>)
        ) : null
        return (
            loading ? 
            <MarketplaceSkeleton /> :
            <div>
                <Card>
                    <CardContent style={{ display: 'flex', padding: '0px 10px 0px 0px' }}>
                        <div style={{ marginRight: 'auto '}}>
                            <Tooltip title='Sort listings' >
                                <IconButton onClick={ this.handleOpenSort }>
                                    <SortIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <Tooltip title='Search by module code' arrow >
                                <IconButton onClick={ this.handleOpen }>
                                    <SearchIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                            <CreateListing />
                        </div>
                    </CardContent>
                </Card>
                <br />
                <Dialog 
                    open={ this.state.open }
                    onClose={ this.handleCloseRefresh }>
                    <DialogTitle>
                        Search listings by module code
                    </DialogTitle>
                    <DialogContent>
                        <TextField 
                            name='module'
                            type='text'
                            label='Module code'
                            fullWidth
                            value={ this.state.postReq.filter }
                            onChange={ this.handleModuleCode }
                            className={ classes.textField }
                            placeholder='Enter module code'
                            color='secondary'
                            inputProps={{ maxLength: 200 }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } style={{ textTransform: 'none' }}>
                            <Typography color="error">Cancel</Typography>
                        </Button>
                        <Button onClick={ this.handleSearch } color="secondary" style={{ textTransform: 'none' }}>
                            <Typography color="secondary">Search</Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog 
                    open={ this.state.openSortMenu }
                    onClose={ this.handleCloseSort }>
                    <DialogTitle>
                        Sort listings
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
                            <MenuItem key={ 2 } value={ 'price,desc' }>
                                Price - High to Low
                            </MenuItem>
                            <MenuItem key={ 3 } value={ 'price,asc' }>
                                Price - Low to High
                            </MenuItem>
                        </Select>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleCloseSort } style={{ textTransform: 'none' }}>
                            <Typography color="error">Cancel</Typography>
                        </Button>
                        <Button onClick={ this.handleSort } color="secondary" style={{ textTransform: 'none' }}>
                            <Typography color="secondary">Sort</Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
                <InfiniteScroll
                        dataLength={listingMarkup.length}
                        hasMore
                        next={() => this.fetchPostData()} />
                <GridList cellHeight={160} className={ classes.gridList } cols={3} spacing={50}>
                    {listingMarkup}
                </GridList> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

const mapActionsToProps = {
    getMarketplaceListings,
    setMarketplacePage,
    setMarketplacePageQuery
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(marketplace));
