import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import StudentConnect from '../images/student-connect.png'
import { Link } from 'react-router-dom';

// MUI
import { Card, CircularProgress, Button, TextField, 
    Typography, Grid, CardContent } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.styles
})

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
            lastLocation: props.location.state.from ? props.location.state.from : '/'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({ errors: this.props.UI.errors })
        }
        if (this.props.user.authenticated) {
            this.props.history.goBack();
        }
    }

    // upon submitting the email and password
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            username: this.state.username
        };
        this.props.signupUser(newUserData, this.props.history, this.state.lastLocation);
    }

    // fills in the textfield with what you typed in
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form} spacing={5}>
                <Grid item sm >
                    <div style={{ textAlign: 'center' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <img src={StudentConnect} alt='social' className={classes.image} />
                    </div>
                </Grid>
                <Grid item sm>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Card>
                        <CardContent>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    className={classes.textField}
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    fullWidth
                                    color="secondary"
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    className={classes.textField}
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    fullWidth
                                    color="secondary"
                                />
                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    className={classes.textField}
                                    helperText={errors.confirmPassword}
                                    error={errors.confirmPassword ? true : false}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    fullWidth
                                    color="secondary"
                                />
                                <TextField
                                    id="username"
                                    name="username"
                                    type="text"
                                    label="Username"
                                    className={classes.textField}
                                    helperText={errors.username}
                                    error={errors.username ? true : false}
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    fullWidth
                                    color="secondary"
                                />
                                {errors.general && (
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                )}
                                
                                <Button type="submit" 
                                    variant="outlined" 
                                    color="secondary" 
                                    className={classes.button}
                                    disabled={loading}> 
                                    SIGN UP
                                    { loading && (<CircularProgress size={30} className={classes.progress} />) } </Button>
                                <br />
                                <br />
                                <small>
                                    Already have an account? Log in <Link to={{ pathname: '/login', state: { from: this.state.lastLocation }}}>here</Link>
                                </small>

                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));