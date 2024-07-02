import { SET_FORUM_POSTS, LOADING_DATA, SET_FORUMS, 
    SET_POSTS, UPVOTE_POSTS, DOWNVOTE_POSTS,
    REMOVE_UPVOTE_POSTS, REMOVE_DOWNVOTE_POSTS, 
    SET_POST, UPVOTE_COMMENTS, DOWNVOTE_COMMENTS, 
    REMOVE_UPVOTE_COMMENTS, REMOVE_DOWNVOTE_COMMENTS, DELETE_POST, 
    CREATE_POST, CREATE_COMMENT, DELETE_COMMENT, 
    SET_OTHER_USER_DATA, ADD_POSTS, ADD_FORUMS, SET_USER_GROUPS, SET_GROUP_INFO, MAKE_MODERATOR, MAKE_MEMBER, ADD_MEMBER, REMOVE_MEMBER } from '../types';

const initialState = {
    info: {},
    posts: [],
    post: {},
    comments: [],
    forums: [],
    loading: false
}

export default function data(state = initialState, action) {
    let index;
    let id;
    switch(action.type) {
        case SET_FORUM_POSTS:
            return {
                ...state,
                loading: false,
                info: action.payload.forumInfo,
                posts: action.payload.posts   
            };
        case SET_GROUP_INFO:
            return {
                ...state,
                info: action.payload
            };
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        case ADD_POSTS:
            state.posts = state.posts.concat(action.payload);
            return {
                ...state,
                loading: false,
            };
        case ADD_FORUMS:
            state.forums = state.forums.concat(action.payload);
            return {
                ...state,
                loading: false,
            }
        case SET_FORUMS:
            return {
                ...state,
                loading: false,
                forums: action.payload
            };
        case SET_POST:
            return {
                ...state,
                loading: false,
                post: action.payload.postInfo,
                comments: action.payload.comments
            }
        case UPVOTE_POSTS:
        case DOWNVOTE_POSTS:
        case REMOVE_UPVOTE_POSTS:
        case REMOVE_DOWNVOTE_POSTS:
            index = state.posts.findIndex(post => post.postId === action.payload.postId);
            state.posts[index] = action.payload;
            if (state.post && state.post.postId === action.payload.postId) {
                state.post = action.payload;
            }
            return {
                ...state
            };
        case UPVOTE_COMMENTS:
        case DOWNVOTE_COMMENTS:
        case REMOVE_UPVOTE_COMMENTS:
        case REMOVE_DOWNVOTE_COMMENTS:
            index = state.comments.findIndex(comment => comment.commentId === action.payload.commentId);
            state.comments[index] = action.payload;
            return {
                ...state
            };
        case DELETE_POST:
            index = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(index, 1);
            return {
                ...state
            };
        case DELETE_COMMENT:
            state.post = {
                ...state.post,
                commentCount: state.post.commentCount - 1
            };
            index = state.comments.findIndex(comment => comment.commentId === action.payload);
            id = state.comments[index].postId;
            state.comments.splice(index, 1);
            index = state.posts.findIndex(post => post.postId === id);
            if (index >= 0) state.posts[index] = {
                ...state.posts[index],
                commentCount: state.posts[index].commentCount - 1
            };
            return {
                ...state
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [ 
                    action.payload,
                    ...state.posts
                ]
            };
        case CREATE_COMMENT:
            state.post = {
                ...state.post,
                commentCount: state.post.commentCount + 1
            };
            index = state.posts.findIndex(post => post.postId === action.payload.postId);
            if (index >= 0) state.posts[index] = {
                ...state.posts[index],
                commentCount: state.posts[index].commentCount + 1
            };
            return {
                ...state,
                comments: [
                    action.payload,
                    ...state.comments
                ]
            };
        case SET_OTHER_USER_DATA:
            return {
                ...state,
                loading: false,
                info: action.payload.userDetails,
                posts: action.payload.posts
            };
        case SET_USER_GROUPS:
            return {
                ...state,
                loading: false,
                forums: action.payload
            };
        case MAKE_MODERATOR:
            index = state.info.members.findIndex(member => member.userId === action.payload);
            state.info.members[index].role = 'moderator';
            return {
                ...state
            };
        case MAKE_MEMBER:
            index = state.info.members.findIndex(member => member.userId === action.payload);
            state.info.members[index].role = 'member';
            return {
                ...state
            };
        case ADD_MEMBER:
            state.info.members.push(action.payload);
            return {
                ...state
            };
        case REMOVE_MEMBER:
            index = state.info.members.findIndex(member => member.userId === action.payload);
            state.info.members.splice(index, 1);
            return {
                ...state
            };
        default:
            return state
    }
}
