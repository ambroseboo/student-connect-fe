import React, { Component } from 'react';
import { Card, CardContent, GridList, GridListTile } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
    ...theme.styles
});

export class GroupExploreSkeleton extends Component {
    render() {
        const { classes } = this.props;
        const listOfThree = [0,1,2];
        const groupCardSkeletons = listOfThree.map(i => 
            <GridListTile cols={1} key={i}>
                <Card className={classes.card}><CardContent className={classes.content}>
                    <br/><br/><br/><br/><br/><br/></CardContent></Card>
            </GridListTile>
        )
        return (
            <div>
                <Card style={{ marginBottom: '3%', height: 48 }}>
                </Card> 
                <GridList cellHeight={160} className={ classes.gridList } cols={3} spacing={50}>
                    { groupCardSkeletons }
                </GridList> 
            </div>
        )
    }
}

export default withStyles(styles)(GroupExploreSkeleton)
