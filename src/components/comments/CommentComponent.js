import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Card, List } from '@material-ui/core';
import CreateComment from './CreateComment';
import { CommentDisplay } from '..';

const styles = (theme) => ({
    ...theme.styles
})

class CommentComponent extends Component {
    
    render() {
        const { comments, postId } = this.props
        let commentDisplay = comments.length > 0 ? (comments.map(comment => <CommentDisplay key={comment.commentId} comment={ comment }/>)) 
            : null
        return (
            <div>
                <Card>
                    <CreateComment postId={ postId }/>
                    <List>
                        { commentDisplay }
                    </List>
                </Card> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, {})(withStyles(styles)(CommentComponent));
