import React, { Component } from 'react';
import { Grid, Card, Typography, CardContent } from '@material-ui/core';
import PostSkeleton from './PostSkeleton';

export class ForumSkeleton extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={10} justify='flex-end'>
                    <Grid item sm />
                    <Grid item sm={8} xs={12}>
                        <div>
                            <Card>
                            <CardContent style={{ display: 'flex' }}>
                                <div>
                                    <Typography variant='h5'>
                                        &nbsp;
                                    </Typography>
                                    <Typography variant='body2'>
                                        &nbsp;
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                        <br />
                        <Card>
                            <CardContent style={{ display: 'flex', padding: '8px 15px 0px 0px' }}>
                                <br />
                                &nbsp;
                            </CardContent>
                        </Card>
                        <br />
                            <PostSkeleton />
                        </div>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        )
    }
}

export default ForumSkeleton
