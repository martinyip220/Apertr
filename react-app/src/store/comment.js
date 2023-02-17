const CREATE_COMMENT = "comments/CREATE_COMMENT";
const GET_COMMENT = "comments/GET_COMMENT";
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
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

const getAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
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
export const createCommentThunk = (commentData) => async (dispatch) => {
    const { photoId, comment } = commentData;

    const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            photoId,
            comment
        })
    })

    if (response.ok) {
        const comment = await response.json();
        await dispatch(createComment(comment));
        return comment;
    }
}



export const getAllCommentsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/comments`);

    if (response.ok) {
        const comments = await response.json();
        await dispatch(getAllComments(comments));
        return comments
    }

}

export const getAllPhotoCommentsThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        await dispatch(getAllPhotoComments(comments));
        return comments
    }
}

export const editCommentThunk = (commentData) => async (dispatch) => {
    const { photoId, comment, id } = commentData;
    console.log("photoid", photoId)
    console.log("i am in the thunk, comment data: ", commentData)

    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            photoId,
            comment,
            id
        })
    })
    if (response.ok) {
        const editedComment = await response.json();
        await dispatch(editComment(editedComment));
        return editedComment;
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const comment = await response.json();
        await dispatch(deleteComment(commentId));
        return comment;
    }
}


const initialState = {
    allComments: {},
    photoComments: {}
}


const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            newState = { ...state };
            newState.allComments = {};
            const comments = action.payload;
            newState.allComments = comments
            return newState
        }
        case CREATE_COMMENT: {
            newState = { ...state };
            newState.photoComments = { ...state.photoComments };
            newState.photoComments[action.payload.comment.id] = action.payload.comment;
            return newState;
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
        case EDIT_COMMENT: {
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        }
        case DELETE_COMMENT: {
            newState = { ...state };
            delete newState.photoComments[action.payload]
            return newState
        }
        default:
            return state
    }
}


export default commentsReducer;
