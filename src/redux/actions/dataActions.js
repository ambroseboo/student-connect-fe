import axios from 'axios';
import { LOADING_UI, SET_FORUM_POSTS, STOP_LOADING_UI, 
    SET_POSTS, SET_FORUMS, UPVOTE_POSTS, DOWNVOTE_POSTS, 
      REMOVE_UPVOTE_POSTS, REMOVE_DOWNVOTE_POSTS, SET_POST, 
      LOADING_DATA, UPVOTE_COMMENTS, DOWNVOTE_COMMENTS, 
      REMOVE_UPVOTE_COMMENTS, REMOVE_DOWNVOTE_COMMENTS, DELETE_POST, 
      CREATE_POST, SET_ERRORS, CLEAR_ERRORS, 
      CREATE_COMMENT, DELETE_COMMENT, SET_OTHER_USER_DATA, 
      SET_FOLLOW, SET_UNFOLLOW, ADD_POSTS, 
      ADD_FORUMS, 
      SET_USER_GROUPS, 
      SET_GROUP_INFO, 
      MAKE_MODERATOR,
      MAKE_MEMBER,
      ADD_MEMBER,
      REMOVE_MEMBER} from '../types';

export const getForumPosts = (forumId, reqBody) => (dispatch) => {
    if (reqBody.startAfter) 
        axios.post(`/forums/posts/${forumId}`, reqBody)
            .then(res => {
                dispatch({
                    type: ADD_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: ADD_POSTS,
                    payload: []
                })
            });
    else {
        dispatch({ type: LOADING_DATA });
        axios.post(`/forums/posts/${forumId}`, reqBody)
            .then(res => {
                dispatch({
                    type: SET_FORUM_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: SET_FORUM_POSTS,
                    payload: {
                        forumInfo: {},
                        posts: []
                    }
                })
            });
        }
}

export const getPosts = (reqBody) => (dispatch) => {
    if (reqBody.startAfter) {
        axios.post('/posts', reqBody)
            .then(res => {
                dispatch({
                    type: ADD_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: ADD_POSTS,
                    payload: []
                });
            });
    } else {
        dispatch({ type: LOADING_DATA });
        axios.post('/posts', reqBody)
            .then(res => {
                dispatch({
                    type: SET_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: SET_POSTS,
                    payload: []
                });
            });
    }
}

export const getForums = (reqBody) => (dispatch) => {
    if (reqBody.startAfter) {
        axios.post('/forums', reqBody)
            .then(res => {
                dispatch({
                    type: ADD_FORUMS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: ADD_FORUMS,
                    payload: []
                });
            });
    } else {
        dispatch({ type: LOADING_DATA });
        axios.post('/forums', reqBody)
            .then(res => {
                dispatch({
                    type: SET_FORUMS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: SET_FORUMS,
                    payload: []
                });
            });
    }
}

// Upvote post
export const upvotePost = (postId) => (dispatch) => {
    axios.post(`/posts/${postId}/upvote`)
        .then(res => {
            dispatch({
                type: UPVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const downvotePost = (postId) => (dispatch) => {
    axios.post(`/posts/${postId}/downvote`)
        .then(res => {
            dispatch({
                type: DOWNVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const unUpvotePost = (postId) => (dispatch) => {
    axios.post(`/posts/${postId}/unupvote`)
        .then(res => {
            dispatch({
                type: REMOVE_UPVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const unDownvotePost = (postId) => (dispatch) => {
    axios.post(`/posts/${postId}/undownvote`)
        .then(res => {
            dispatch({
                type: REMOVE_DOWNVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const upvoteComment = (commentId) => (dispatch) => {
    axios.post(`/comments/${commentId}/upvote`)
        .then(res => {
            dispatch({
                type: UPVOTE_COMMENTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const downvoteComment = (commentId) => (dispatch) => {
    axios.post(`/comments/${commentId}/downvote`)
        .then(res => {
            dispatch({
                type: DOWNVOTE_COMMENTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const unUpvoteComment = (commentId) => (dispatch) => {
    axios.post(`/comments/${commentId}/unupvote`)
        .then(res => {
            dispatch({
                type: REMOVE_UPVOTE_COMMENTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const unDownvoteComment = (commentId) => (dispatch) => {
    axios.post(`/comments/${commentId}/undownvote`)
        .then(res => {
            dispatch({
                type: REMOVE_DOWNVOTE_COMMENTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/posts/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        }).catch(err => console.log(err))
}

export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/posts/${postId}`)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            });
        }).catch(err => console.log(err));
}

export const deleteComment = (commentId) => (dispatch) => {
    axios.delete(`/comments/${commentId}`)
        .then(() => {
            dispatch({
                type: DELETE_COMMENT,
                payload: commentId
            });
        }).catch(err => console.log(err));
}

export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/posts/${newPost.forum}`, { body: newPost.body, title: newPost.title })
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        }).catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
}

export const createForum = (newForum, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/forums/create', newForum)
        .then(res => {
            dispatch({ type: CLEAR_ERRORS })
            history.push(`forums/forum/${res.data}`);
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const createComment = (newComment) => (dispatch) => {
    axios.post(`/posts/${newComment.postId}/comment`, { body: newComment.body })
        .then(res => {
            console.log(res.data)
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data
            });
        }).catch(err => console.error(err));
}

export const getUserData = (userId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/users/${userId}`)
        .then(res => {
            dispatch({ 
                type: SET_OTHER_USER_DATA,
                payload: res.data 
            })
        }).catch(err => console.log(err))
}

export const getUserPosts = (userId, reqBody) => (dispatch) => {
    if (reqBody.startAfter) 
        axios.post(`/users/posts/${userId}`, reqBody)
            .then(res => {
                dispatch({
                    type: ADD_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: ADD_POSTS,
                    payload: []
                })
            });
    else {
        dispatch({ type: LOADING_DATA });
        axios.post(`/users/posts/${userId}`, reqBody)
            .then(res => {
                dispatch({
                    type: SET_OTHER_USER_DATA,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: SET_OTHER_USER_DATA,
                    payload: {
                        forumInfo: {},
                        posts: []
                    }
                })
            });
    }
}

export const followForum = (forumId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('forums/follow', { forumId })
        .then(res => {
            dispatch({
                type: SET_FOLLOW,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const unfollowForum = (forumId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('forums/unfollow', { forumId })
        .then(res => {
            dispatch({
                type: SET_UNFOLLOW,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const getUserGroups = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('users/groups')
        .then(res => {
            dispatch({
                type: SET_USER_GROUPS,
                payload: res.data
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: SET_USER_GROUPS,
                payload: []
            })
        });
}

export const getGroupInfo = (groupId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/groups/${groupId}`)
        .then(res => {
            dispatch({
                type: SET_GROUP_INFO,
                payload: res.data
            });
        }).catch(err => {
            console.log(err);
            dispatch({
                type: SET_GROUP_INFO,
                payload: {}
            })
        })
}

export const getGroupPosts = (groupId, reqBody) => (dispatch) => {
    if (reqBody.startAfter) 
        axios.post(`/groups/posts/${groupId}`, reqBody)
            .then(res => {
                dispatch({
                    type: ADD_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: ADD_POSTS,
                    payload: []
                })
            });
    else {
        dispatch({ type: LOADING_DATA });
        axios.post(`/groups/posts/${groupId}`, reqBody)
            .then(res => {
                dispatch({
                    type: SET_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: SET_POSTS,
                    payload: []
                })
            });
        }
}

export const deleteGroupPost = (postId) => (dispatch) => {
    axios.delete(`/groupPosts/${postId}`)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            });
        }).catch(err => console.log(err));
}

export const getGroupPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/groupPosts/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        }).catch(err => console.log(err))
}

export const upvoteGroupPost = (postId) => (dispatch) => {
    axios.post(`/groupPosts/${postId}/upvote`)
        .then(res => {
            dispatch({
                type: UPVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const downvoteGroupPost = (postId) => (dispatch) => {
    axios.post(`/groupPosts/${postId}/downvote`)
        .then(res => {
            dispatch({
                type: DOWNVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const unUpvoteGroupPost = (postId) => (dispatch) => {
    axios.post(`/groupPosts/${postId}/unupvote`)
        .then(res => {
            dispatch({
                type: REMOVE_UPVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const unDownvoteGroupPost = (postId) => (dispatch) => {
    axios.post(`/groupPosts/${postId}/undownvote`)
        .then(res => {
            dispatch({
                type: REMOVE_DOWNVOTE_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const createCommentOnGroupPost = (newComment) => (dispatch) => {
    axios.post(`/groupPosts/${newComment.postId}/comment`, { body: newComment.body })
        .then(res => {
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data
            });
        }).catch(err => console.error(err));
}

export const createGroupPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/posts/groups/${newPost.group}`, { body: newPost.body, title: newPost.title })
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        }).catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
}

export const createGroup = (newGroup, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/groups/create', newGroup)
        .then(res => {
            dispatch({ type: CLEAR_ERRORS })
            history.push(`groups/${res.data}`);
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const makeModerator = (groupId, userId) => (dispatch) => {
    axios.post(`/groups/${groupId}/addModerator`, { userId })
        .then(res => {
            dispatch({ 
                type: MAKE_MODERATOR,
                payload: userId 
            });
        }).catch(err => console.error(err));
}

export const removeModerator = (groupId, userId) => (dispatch) => {
    axios.post(`/groups/${groupId}/removeModerator`, { userId })
        .then(res => {
            dispatch({ 
                type: MAKE_MEMBER,
                payload: userId 
            });
        }).catch(err => console.error(err));
}

export const addMember = (groupId, username) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/groups/${groupId}/addMember`, { username })
        .then(res => {
            dispatch({
                type: ADD_MEMBER,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const removeMember = (groupId, userId) => (dispatch) => {
    axios.post(`/groups/${groupId}/removeMember`, { userId })
        .then(res => {
            dispatch({
                type: REMOVE_MEMBER,
                payload: res.data
            });
        }).catch(err => console.error(err));
}

export const getMarketplaceListings = (reqBody) => (dispatch) => {
    console.log(reqBody)
    if (reqBody.startAfter) {
        axios.post('/marketplace', reqBody)
            .then(res => {
                dispatch({
                    type: ADD_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: ADD_POSTS,
                    payload: []
                });
            });
    } else {
        dispatch({ type: LOADING_DATA });
        axios.post('/marketplace', reqBody)
            .then(res => {
                dispatch({
                    type: SET_POSTS,
                    payload: res.data
                });
            }).catch(err => {
                dispatch({
                    type: SET_POSTS,
                    payload: []
                });
            });
    }
}

export const getListing = (listingId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/marketplace/${listingId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        }).catch(err => console.log(err))
}

export const deleteListing = (postId) => (dispatch) => {
    axios.delete(`/marketplace/${postId}`)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            });
        }).catch(err => console.log(err));
}

export const createMarketplaceListings = (formData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/marketplace/create', formData)
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const createCommentOnListing = (newComment) => (dispatch) => {
    axios.post(`/marketplace/${newComment.postId}/comment`, { body: newComment.body })
        .then(res => {
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data
            });
        }).catch(err => console.error(err));
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
