import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Card, TextField, Avatar } from '@material-ui/core';
import NoImg from '../../images/no-img.png'

const styles = (theme) => ({
    ...theme.styles
})

class CommentSkeleton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Avatar src={ NoImg } className={ classes.commentAvatar }></Avatar>
                    <form className={ classes.commentForm }>
                    <TextField name='body'
                        type='text'
                        label='Comment on post'
                        fullWidth
                        className={ classes.textField }
                        placeholder='Write a comment...' 
                        color="secondary"/>
                    </form>
                    </div>
                    <br />
                </Card> 
            </div>
        )
    }
}

export default withStyles(styles)(CommentSkeleton);
