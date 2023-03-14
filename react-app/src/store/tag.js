const CREATE_TAG = "tag/CREATE_TAG";
const GET_ALL_PHOTO_TAGS = "tags/GET_ALL_PHOTO_TAGS";
const EDIT_TAG = "tag/EDIT_TAG";
const DELETE_TAG = "tag/DELETE_TAG";
const PHOTO_TAGS = "tag/PHOTO_TAGS";


// Actions
const createTag = (tag) => ({
    type: CREATE_TAG,
    payload: tag
})

const getAllPhotoTags = (tags) => ({
    type: GET_ALL_PHOTO_TAGS,
    payload: tags
})

const editTag = (tag) => ({
    type: EDIT_TAG,
    payload: tag
})

const deleteTag = (tagId) => ({
    type: DELETE_TAG,
    payload: tagId
})

const photoTags = (tags) => ({
    type: PHOTO_TAGS,
    payload: tags
})

// Action Thunks
export const createTagThunk = (tagData) => async (dispatch) => {
    const { photoId, tag } = tagData;

    const response = await fetch(`/api/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            photoId,
            tag
        })
    })

    if (response.ok) {
        const tag = await response.json();
        await dispatch(createTag(tag));
        return tag;
    }
}


export const getAllPhotoTagsThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/tags`);

    if (response.ok) {
        const tags = await response.json();
        await dispatch(getAllPhotoTags(tags));
        return tags;
    }
}


export const editTagThunk = (tagData) => async (dispatch) => {
    const { photoId, tag, id } = tagData;

    const response = await fetch(`/api/tags/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            photoId,
            tag,
            id
        })
    })
    if (response.ok) {
        const editedTag = await response.json();
        await dispatch(editTag(editedTag));
        return editedTag
    }
}


export const deleteTagThunk = (tagId) => async (dispatch) => {
    const response = await fetch(`/api/tags/${tagId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const tag = await response.json();
        await dispatch(deleteTag(tagId));
        return tag;
    }
}

export const photosSameTagsThunk = (tag) => async (dispatch) => {
    const response = await fetch(`/api/photos/tags/${tag}`);

    if (response.ok) {
        const tags = await response.json();
        await dispatch(photoTags(tags));
        return tags;
    }
}


const initialState = {
    allTags: {},
    photoTags: {}
}


const tagsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PHOTO_TAGS: {
            newState = { ...state };
            newState.photoTags = {};
            const tags = action.payload
            newState.photoTags = tags
            return newState
        }
        case CREATE_TAG: {
            newState = { ...state };
            newState.photoTags = { ...state.photoTags };
            newState.photoTags[action.payload.tag.id] = action.payload.tag;
            return newState;
        }
        case EDIT_TAG: {
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        }
        case DELETE_TAG: {
            newState = { ...state };
            delete newState.photoTags[action.payload]
            return newState;
        }
        case PHOTO_TAGS: {
            newState = { ...state };
            newState.allTags = {};
            const tags = action.payload;
            newState.allTags = tags;
            return newState;
        }
        default:
            return state;
    }
}


export default tagsReducer;
