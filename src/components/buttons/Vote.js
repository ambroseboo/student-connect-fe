import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Forward as ForwardIcon, ForwardOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';

export const Vote = (props) => {
    return (
        <div>
            <Tooltip title={ props.up ? 'Upvote' : 'Downvote' } arrow>
                <IconButton onClick={props.onClick} color='secondary'>
                    {props.upvoted ? 
                        <ForwardIcon style={ props.up ? { transform: 'rotate(-90deg)'} : {transform: 'rotate(90deg)'}}/> :
                        <ForwardOutlined style={ props.up ? { transform: 'rotate(-90deg)'} : {transform: 'rotate(90deg)'}}/>
                    }
                </IconButton>
            </Tooltip>
        </div>
    )
}

Vote.propTypes = {
    up: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}
