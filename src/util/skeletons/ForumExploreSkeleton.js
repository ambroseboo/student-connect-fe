import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Card, CardContent, GridList, GridListTile } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styles
})

export class ForumExploreSkeleton extends Component {
    render() {
        const { classes } = this.props;
        const listOfNine = [0,1,2,3,4,5,6,7,8];
        const forumCardSkeletons = listOfNine.map(i => 
            <GridListTile cols={1} key={i}>
                <Card className={classes.card}><CardContent className={classes.content}>
                    <br/><br/><br/><br/><br/><br/></CardContent></Card>
            </GridListTile>
        )
        return (
            <div>
                <Card style={{ marginBottom: '3%' }}>
                    <CardContent style={{ display: 'flex' }}>
                        <div style={{ marginRight: 'auto', marginBottom: '14px', padding: 0 }}>
                        </div>
                    </CardContent>
                </Card>
                <GridList cellHeight={160} className={ classes.gridList } cols={3} spacing={50}>
                    { forumCardSkeletons }
                </GridList> 
            </div>
        )
    }
}

export default withStyles(styles)(ForumExploreSkeleton)
