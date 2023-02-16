const CREATE_COMMENT = "comments/CREATE_COMMENT";
const GET_COMMENT = "comments/GET_COMMENT";
const GET_ALL_PHOTO_COMMENTS = "comments/GET_ALL_PHOTO_COMMENTS";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";


// Actions
const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
})

const getOneComment = (comment) => ({
    type: GET_COMMENT,
    payload: comment
})

const getAllPhotoComments = (comments) => ({
    type: GET_ALL_PHOTO_COMMENTS,
    payload: comments
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})


// Action Thunks
export const getAllPhotoCommentsThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        await dispatch(getAllPhotoComments(comments));
        return comments
    }
}


const initialState = {
    allComments: {},
    photoComments: {}
}


const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_COMMENT: {

        }
        case GET_COMMENT: {

        }
        case GET_ALL_PHOTO_COMMENTS: {
            newState = { ...state };
            newState.photoComments = {};
            const comments = action.payload
            newState.photoComments = comments
            return newState
        }
        default:
            return state
    }
}


export default commentsReducer;
