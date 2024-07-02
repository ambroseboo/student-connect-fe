import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Card, CardContent } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styles
})

export class PostSkeleton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content} style={{ height: '200px' }}>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(PostSkeleton)
