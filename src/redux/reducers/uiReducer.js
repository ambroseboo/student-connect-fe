import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, 
    STOP_LOADING_UI, SET_HOME_PAGE, SET_FORUM_EXPLORE_PAGE,
    SET_FORUM_PAGE, SET_USER_PAGE, SET_DARK_MODE, SET_LIGHT_MODE, 
    SET_GROUP_EXPLORE_PAGE, SET_GROUP_PAGE, SET_MARKETPLACE_PAGE,
    SET_MARKPLACE_PAGE_QUERY, SET_HOME_PAGE_QUERY, SET_FORUM_EXPLORE_PAGE_QUERY, SET_FORUM_PAGE_QUERY, SET_GROUP_PAGE_QUERY } from '../types';

const initialState = {
    loading: false,
    errors: null,
    page: '',
    theme: ''
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI: 
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        case SET_HOME_PAGE:
            return {
                ...state,
                page: 'home'
            };
        case SET_HOME_PAGE_QUERY:
            return {
                ...state,
                page: 'home-query'
            }
        case SET_GROUP_PAGE_QUERY:
        case SET_FORUM_PAGE_QUERY:
        case SET_FORUM_PAGE: 
        case SET_USER_PAGE:
        case SET_GROUP_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case SET_FORUM_EXPLORE_PAGE:
            return {
                ...state,
                page: 'forum-explore'
            };
        case SET_FORUM_EXPLORE_PAGE_QUERY:
            return {
                ...state,
                page: 'forum-explore-query'
                
            };
        case SET_GROUP_EXPLORE_PAGE:
            return {
                ...state,
                page: 'group-explore'
            };
        case SET_MARKETPLACE_PAGE:
            return {
                ...state,
                page: 'marketplace'
            };
        case SET_MARKPLACE_PAGE_QUERY:
            return {
                ...state,
                page: 'marketplace-query'
            };
        case SET_DARK_MODE:
            return {
                ...state,
                theme: 'dark'
            };
        case SET_LIGHT_MODE:
            return {
                ...state,
                theme: 'light'
            }
        default:
            return state;
    }
}