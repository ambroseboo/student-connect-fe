import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { setGroupExplorePage } from '../redux/actions/uiActions';
import { getUserGroups } from '../redux/actions/dataActions';
import { Card, CardContent, Typography, GridList, GridListTile } from '@material-ui/core';
import { CreateGroup, GroupCard } from '../components';
import GroupExploreSkeleton from '../util/skeletons/GroupExploreSkeleton';

const styles = (theme) => ({
    ...theme.styles
})

class groupExplore extends Component {
    componentDidMount = () => {
        this.props.setGroupExplorePage();
        if (this.props.user.authenticated) this.props.getUserGroups();
    }

    componentDidUpdate = (prevProps) => {
        if (!prevProps.user.authenticated) {
            if (this.props.user.authenticated) this.props.getUserGroups();
        }
    }

    render() {
        const { classes, data: { forums, loading }} = this.props;
        const groupsMarkup = forums.map(group => <GridListTile cols={1} key={ group.title }>
            <GroupCard key={ group.title } group={ group } />
            </GridListTile>)
        return (
            loading ? 
            <GroupExploreSkeleton />
            :
            <div>
                <Card style={{ marginBottom: '3%' }}>
                    <CardContent style={{ display: 'flex', padding: 0 }}>
                        <div style={{ marginLeft: 'auto' }}>
                            <CreateGroup history={ this.props.history }/>
                        </div>
                    </CardContent>
                </Card>
                { this.props.user.authenticated ? 
                    
                    <GridList cellHeight={160} className={ classes.gridList } cols={3} spacing={50}>
                        { groupsMarkup }
                    </GridList> 
                    : 
                    <Card>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant='body1'>You have to be authenticated to view Groups</Typography>
                        </CardContent>
                    </Card> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
    user: state.user
});

const mapActionsToProps = {
    setGroupExplorePage,
    getUserGroups
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(groupExplore));
