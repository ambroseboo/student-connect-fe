import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types';
import { getUserData } from './dataActions';

export const loginUser = (userData, history, lastLocation) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getCurrentUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push(lastLocation);
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const signupUser = (newUserData, history, lastLocation) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch(getCurrentUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push(lastLocation);
            })
            .catch(err => {
                console.error(err.response.data)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = '/';
}

export const getCurrentUserData = () => (dispatch) => {
    axios.get('/users')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        }).catch(err => console.error(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/users', userDetails)
      .then(() => {
        dispatch(getCurrentUserData());
      })
      .catch((err) => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/users/image', formData)
        .then(res => {
            dispatch(getUserData());
        }).catch(err => console.log(err));
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios.post('/notifications', notificationIds)
        .then(res => {
            dispatch({ type: MARK_NOTIFICATIONS_READ })
        }).catch(err => {
            console.log(err);
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}