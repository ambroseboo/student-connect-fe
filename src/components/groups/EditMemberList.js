import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { DialogContent, Select, MenuItem, Typography, 
    Input, FormControl, IconButton, Tooltip, 
    DialogTitle, DialogActions, Button, Dialog } from '@material-ui/core';
import { makeModerator, removeModerator, removeMember } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';

class EditMemberList extends Component {
    state = {
        role: '',
        open: false
    };

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    handleDelete = () => {
        this.props.removeMember(this.props.groupId, this.props.member.userId);
        this.handleClose();
    }

    mapUserDetailsToState = (userRole) => {
        this.setState({ role: userRole ? userRole : '' });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.value === 'moderator') 
            this.props.makeModerator(this.props.groupId, this.props.member.userId);
        else this.props.removeModerator(this.props.groupId, this.props.member.userId);
    };

    componentDidMount = () => {
        this.mapUserDetailsToState(this.props.member.role);
    };

    render() {
        const roles = ['Member', 'Moderator']
        const { member: { username }} = this.props;
        const optionsMarkup = roles.map(role => <MenuItem key={role} value={role.toLowerCase()}>{role}</MenuItem>)
        const isOwner = this.state.role === 'owner';
        return (
            <DialogContent>
                <div style={{ display: 'flex' }}>
                    { isOwner ? <Typography>&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                        :
                        <Tooltip title='Remove member' arrow>
                            <IconButton style={{ padding: '0' }} onClick={ this.handleOpen }>
                                <Close color='error' fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                    }
                    &nbsp;&nbsp;&nbsp;
                    <Typography>
                        { username }
                    </Typography>
                        <FormControl style={{ marginLeft: 'auto' }}>                  
                            { isOwner ? <Typography style={{ marginLeft: 'auto' }}>
                                Owner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography> 
                                :
                                <Select
                                    name='role'
                                    id='role'
                                    value={ this.state.role }
                                    input={ <Input />}
                                    onChange={ this.handleChange }
                                    >
                                        { optionsMarkup }
                                </Select>    
                            }
                            
                        </FormControl>
                        <Dialog
                            open={ this.state.open }
                            onClose={ this.handleClose }
                            fullWidth
                            maxWidth='sm'>
                                <DialogTitle>
                                    <Typography>Are you sure you want to remove this member?</Typography>
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={ this.handleClose } style={{ textTransform: 'none' }}>
                                        <Typography color='error'>Cancel</Typography>
                                    </Button>
                                    <Button onClick={ this.handleDelete } style={{ textTransform: 'none' }}>
                                        <Typography color='secondary'>Remove</Typography>
                                    </Button>
                                </DialogActions>

                        </Dialog>
                </div>
            </DialogContent>
        )
    }
}

EditMemberList.propTypes = {
    groupId: PropTypes.string.isRequired,
    member: PropTypes.object.isRequired
}

const mapActionsToProps = {
    makeModerator,
    removeModerator,
    removeMember
}

export default connect(null, mapActionsToProps)(EditMemberList)
