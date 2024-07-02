import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED,
    UPVOTE_POSTS, DOWNVOTE_POSTS, REMOVE_UPVOTE_POSTS, REMOVE_DOWNVOTE_POSTS, 
    UPVOTE_COMMENTS, DOWNVOTE_COMMENTS, REMOVE_UPVOTE_COMMENTS, 
    REMOVE_DOWNVOTE_COMMENTS, SET_FOLLOW, SET_UNFOLLOW, MARK_NOTIFICATIONS_READ } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    upvotes: [],
    downvotes: [],
    commentUpvotes: [],
    commentDownvotes: [],
    forumFollows: [],
    notifications: []
}

export default function user(state = initialState, action) {
    let index;
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER: 
            return {
                authenticated: true,
                ...action.payload
            };
        case UPVOTE_POSTS:
            index = state.downvotes.findIndex(downvote => downvote === action.payload.postId);
            if (index > -1) state.downvotes.splice(index, 1);
            state.upvotes.push(action.payload.postId);
            return {
                ...state,
            };
        case DOWNVOTE_POSTS:
            index = state.upvotes.findIndex(upvote => upvote === action.payload.postId);
            if (index > -1) state.upvotes.splice(index, 1);
            state.downvotes.push(action.payload.postId);
            return {
                ...state,
            };
        case REMOVE_UPVOTE_POSTS:
            return {
                ...state,
                upvotes: state.upvotes.filter(upvote => upvote !== action.payload.postId)
            };
        case REMOVE_DOWNVOTE_POSTS:
            return {
                ...state,
                downvotes: state.downvotes.filter(downvote => downvote !== action.payload.postId)
            };
        case UPVOTE_COMMENTS:
            index = state.commentDownvotes.findIndex(downvote => downvote === action.payload.commentId);
            if (index > -1) state.commentDownvotes.splice(index, 1);
            state.commentUpvotes.push(action.payload.commentId);
            return {
                ...state,
            };
        case DOWNVOTE_COMMENTS:
            index = state.commentUpvotes.findIndex(upvote => upvote === action.payload.commentId);
            if (index > -1) state.commentUpvotes.splice(index, 1);
            state.commentDownvotes.push(action.payload.commentId);
            return {
                ...state,
            };
        case REMOVE_UPVOTE_COMMENTS:
            return {
                ...state,
                commentUpvotes: state.commentUpvotes.filter(upvote => upvote !== action.payload.commentId)
            };
        case REMOVE_DOWNVOTE_COMMENTS:
            return {
                ...state,
                commentDownvotes: state.commentDownvotes.filter(downvote => downvote !== action.payload.commentId)
            };
        case SET_FOLLOW:
            state.forumFollows.push(action.payload.forumId);
            return {
                ...state
            };
        case SET_UNFOLLOW:
            index = state.forumFollows.findIndex(forum => forum === action.payload.forumId);
            if (index > -1) state.forumFollows.splice(index, 1);
            return {
                ...state
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notification => {
                notification.read = true;
            });
            return {
                ...state
            }
        default: 
            return state;
    }
}