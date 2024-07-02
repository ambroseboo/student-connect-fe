import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import EditMemberList from './EditMemberList';

//MUI
import { IconButton, Tooltip, Dialog, DialogTitle } from '@material-ui/core';
import { People as PeopleIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import MemberList from './MemberList';

const styles = (theme) => ({
    ...theme.styles
})

class ViewMembers extends Component {
    state = {
        open: false
    }

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    render() {
        const { user: { authenticated, credentials: { userId} }, 
            data: { info: { members, title, ownerId }}} = this.props;
        const { open } = this.state;
        const sortedMembers = members ? members.sort((m1, m2) => {
            if (m1.role > m2.role) return -1;
            else if (m1.role < m2.role) return 1;
            else return 0;
        }) : [];
        const membersMarkup = ownerId === userId ? sortedMembers.map(member => 
            <EditMemberList key={member.userId} member={member} groupId={title}></EditMemberList>) : 
            sortedMembers.map(member => <MemberList key={member.userId} member={member} />)
        return (
            <Fragment>
                <Tooltip title='Manage members' arrow>
                    { authenticated ? 
                    (<IconButton color='secondary' onClick={ this.handleOpen }>
                        <PeopleIcon />
                    </IconButton>) : 
                    (<IconButton color='secondary' component={ Link } 
                        to={{ pathname: '/login', state: { from: this.props.location.pathname }}}>
                        <PeopleIcon />
                    </IconButton>)}
                </Tooltip>

                <Dialog 
                    open={ open }
                    onClose={ this.handleClose }
                    fullWidth maxWidth='xs'>
                        <DialogTitle>
                            Manage members
                        </DialogTitle>
                        { membersMarkup }
                </Dialog>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
    user: state.user
});

export default connect(mapStateToProps, { })(withStyles(styles)(ViewMembers));
