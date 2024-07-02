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

class ForumCard extends Component {
    render() {
        const { classes, forum : { faculty, title } } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>

                        <Typography className={classes.postTitle} variant="h5" color="textPrimary" component={Link} to={`/forums/forum/${title}`}>
                            { title }
                        </Typography>
                        <Typography paragraph className={classes.postBody} variant="body1">
                            { faculty }
                        </Typography>
                        <Button component={Link} to={`/forums/forum/${title}`}>View forum</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(ForumCard);
