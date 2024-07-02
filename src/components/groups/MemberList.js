import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { DialogContent, Typography, FormControl } from '@material-ui/core';
import { makeModerator, removeModerator } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

class MemberList extends Component {

    render() {
        const { member: { username, role }} = this.props;
        return (
            <DialogContent>
                <div style={{ display: 'flex' }}>
                    <Typography>
                        { username }
                    </Typography>
                        <FormControl style={{ marginLeft: 'auto' }}>
                            <Typography style={{ textTransform: 'capitalize' }}>{ role }</Typography>
                        </FormControl>
                    
                </div>
            </DialogContent>
        )
    }
}

MemberList.propTypes = {
    member: PropTypes.object.isRequired
}

const mapActionsToProps = {
    makeModerator,
    removeModerator
}

export default connect(null, mapActionsToProps)(MemberList)
