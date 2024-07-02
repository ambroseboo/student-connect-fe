import React, { useRef, useState } from 'react'

//MUI
import { IconButton, MenuItem, Menu, Tooltip } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';

const More = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleClick = (event) => {
        setMenuOpen(true);
    };
    const handleClose = () => {
        setMenuOpen(false);
    };
    const buttonRef = useRef();
    const deleteComponent = props.deleteComponent;
    return (
        <div>
            <Tooltip title='More' arrow>
                <IconButton onClick={ handleClick } ref={ buttonRef } color='secondary'>
                    <MoreHoriz />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={ buttonRef.current }
                open={ menuOpen }
                keepMounted
                onClose={ handleClose }>
                <MenuItem>
                    Report
                </MenuItem>
                { props.authenticated && (props.username === props.credentials.username || props.isMod) ? 
                    deleteComponent
                     : null}
            </Menu>
        </div>
    )
}

export default More
