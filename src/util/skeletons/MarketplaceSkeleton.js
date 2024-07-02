import React, { Component } from 'react';
import { Card, CardContent, GridListTile, GridList } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
    ...theme.styles
})

export class MarketplaceSkeleton extends Component {
    render() {
        const { classes } = this.props;
        const listOfThree = [0,1,2];
        const marketCardSkeletons = listOfThree.map(i => 
            <GridListTile cols={1} key={i} style={{ height: 455 }}>
                <Card style={{ height: 455 }}><CardContent>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></CardContent></Card>
            </GridListTile>
        )
        return (
            <div>
                <Card style={{ height: 49 }}>
                    <CardContent style={{ display: 'flex', padding: '0px 10px 0px 0px' }}>
                        <br />
                    </CardContent>
                </Card>
                <br />
                <GridList cellHeight={160} className={ classes.gridList } cols={3} spacing={50}>
                    { marketCardSkeletons }
                </GridList> 
            </div>
        )
    }
}

export default withStyles(styles)(MarketplaceSkeleton)
