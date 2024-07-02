import { SET_HOME_PAGE, SET_FORUM_PAGE, SET_USER_PAGE, SET_FORUM_EXPLORE_PAGE, 
    SET_DARK_MODE, SET_LIGHT_MODE, SET_GROUP_EXPLORE_PAGE, SET_GROUP_PAGE, 
    SET_MARKETPLACE_PAGE, SET_MARKPLACE_PAGE_QUERY, SET_HOME_PAGE_QUERY, 
    SET_FORUM_EXPLORE_PAGE_QUERY, 
    SET_FORUM_PAGE_QUERY,
    SET_GROUP_PAGE_QUERY} from "../types";

export const setHomePage = () => (dispatch) => {
    dispatch({ type: SET_HOME_PAGE });
}

export const setHomePageQuery = () => (dispatch) => {
    dispatch({ type: SET_HOME_PAGE_QUERY });
}

export const setForumPage = (forumTitle) => (dispatch) => {
    dispatch({ 
        type: SET_FORUM_PAGE,
        payload: `forum=${forumTitle}` 
    });
}

export const setForumPageQuery = () => (dispatch) => {
    dispatch({ 
        type: SET_FORUM_PAGE_QUERY,
        payload: `forum-query` 
    });
}

export const setUserPage = (userId) => (dispatch) => {
    dispatch({ 
        type: SET_USER_PAGE,
        payload: `user=${userId}` 
    });
}

export const setForumExplorePage = () => (dispatch) => {
    dispatch({ type: SET_FORUM_EXPLORE_PAGE });
}

export const setForumExplorePageQuery = () => (dispatch) => {
    dispatch({ type: SET_FORUM_EXPLORE_PAGE_QUERY });
}

export const setGroupExplorePage = () => (dispatch) => {
    dispatch({ type: SET_GROUP_EXPLORE_PAGE });
}

export const setGroupPage = (groupTitle) => (dispatch) => {
    dispatch({ 
        type: SET_GROUP_PAGE,
        payload: `group=${groupTitle}` 
    });
}

export const setGroupPageQuery = () => (dispatch) => {
    dispatch({ 
        type: SET_GROUP_PAGE_QUERY,
        payload: `group-query` 
    });
}

export const setMarketplacePage = () => (dispatch) => {
    dispatch({ type: SET_MARKETPLACE_PAGE });
}

export const setDarkMode = () => (dispatch) => {
    localStorage.setItem('theme', 'dark');
    dispatch({ type: SET_DARK_MODE });
}

export const setLightMode = () => (dispatch) => {
    localStorage.setItem('theme', 'light');
    dispatch({ type: SET_LIGHT_MODE });
}

export const setMarketplacePageQuery = () => (dispatch) => {
    dispatch({ type: SET_MARKPLACE_PAGE_QUERY });
}