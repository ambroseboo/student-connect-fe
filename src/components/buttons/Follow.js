import React from 'react';
import { Button, Tooltip, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export const Follow = (props) => {
    return (
        <div>
            <Tooltip title={ props.followed ? 'Unfollow' : 'Follow' } arrow>
                <Button onClick={ props.onClick } variant={props.followed ? 'contained' : 'outlined' }
                style={{ textTransform: 'none' }} color='default'>
                    { props.followed ? 
                        <Typography color="textSecondary" variant="body1">Followed</Typography> :
                        <Typography color="textSecondary" variant="body1">Follow</Typography>
                    }
                </Button>
            </Tooltip>
        </div>
    )
}

Follow.propTypes = {
    onClick: PropTypes.func.isRequired
}
