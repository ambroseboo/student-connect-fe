import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.styles
})

class GroupCard extends Component {
    render() {
        const { classes, group: { title } } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>

                        <Typography className={classes.postTitle} variant="h5" color="textPrimary" component={Link} to={`/groups/${title}`}>
                            { title }
                        </Typography>
                        <br />
                        <Button component={Link} to={`/groups/${title}`}>View group</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(GroupCard);
