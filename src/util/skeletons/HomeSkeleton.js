import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Card, Typography, List, ListItem } from '@material-ui/core';
import PostSkeleton from './PostSkeleton';

const styles = (theme) => ({
    ...theme.styles
})

export class HomeSkeleton extends Component {
    render() {
        const { classes } = this.props;
        const listOfFive = [1, 2, 3, 4, 5]
        const forumListSkeleton = listOfFive.map(x => 
            <ListItem className={ classes.listItem } key={x}>
                <div>
                    <Typography className={ classes.forumTitle } variant="h6">
                        &nbsp;
                    </Typography>
                    <Typography className={ classes.forumDescription } variant="body2" color="textSecondary">
                        &nbsp;
                    </Typography>
                </div>
            </ListItem>)
        return (
            <div>
                <Grid container spacing={10} justify='flex-end'>
                    <Grid item sm={8} xs={12}>
                        <Card>
                            <br />
                            <br />
                            <div style={{ marginBottom: '8px' }}></div>
                        </Card>
                        <br />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Card>
                            <br/>                        
                                <Typography p={2} variant='h6' className={ classes.forumHeader } color="textPrimary">
                                    &nbsp;
                                </Typography>
                            <List className={ classes.list }>
                                    { forumListSkeleton }
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(HomeSkeleton)
