
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MUI Stuff
import { Select, Input, IconButton, Tooltip, Typography, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import { majors } from '../../util/data';

const styles = (theme) => ({
  ...theme.styles
});

class EditDetails extends Component {
  state = {
    bio: '',
    major: '',
    open: false
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      major: credentials.major ? credentials.major : ''
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      major: this.state.major
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    /* const majors = {
      "School of Computing": ["Computer Science", "Business Analytics"],
      "Science": ['Pharmaceutical Science', 'Statistics']
    } */
    const sortedMajors = majors.sort();
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Details" arrow>
        <IconButton onClick={this.handleOpen} className={classes.button}>
          <EditIcon color="secondary" />
        </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                color="secondary"
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <InputLabel htmlFor='major-label'>Major</InputLabel>
              <Select
                native
                name='major'
                labelId='major-label'
                id='major'
                value={this.state.major}
                onChange={this.handleChange}
                input={<Input />}
                style={{ minWidth: 100 }}
                inputProps={{
                  name: 'major',
                  id: 'major-label'
                }}>
                  <option key={"none"} value={""}>
                    --
                  </option>
                  {sortedMajors.map(major => (
                    <option key={major} value={major}> { major } </option>
                  ))}
              </Select>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ textTransform: 'none' }}>
              <Typography color="error">Cancel</Typography>
            </Button>
            <Button onClick={this.handleSubmit} color="secondary" style={{ textTransform: 'none' }}>
              <Typography color="secondary">Save</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
