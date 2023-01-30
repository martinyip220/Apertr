const UPLOAD_PHOTO = 'photos/UPLOAD_PHOTO';
const GET_PHOTO = 'photos/GET_PHOTO';
const GET_ALL_PHOTOS = 'photos/GET_ALL_PHOTOS'
const USER_PHOTOS = 'photos/USER_PHOTOS';
const EDIT_PHOTO = 'photos/EDIT_PHOTO';
const DELETE_PHOTO = 'photos/DELETE_PHOTO';


// Actions
const uploadPhoto = (photo) => ({
    type: UPLOAD_PHOTO,
    payload: photo
})

const getOnePhoto = (photo) => ({
    type: GET_PHOTO,
    payload: photo
})

const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
})

const userPhotos = (photos) => ({
    type: USER_PHOTOS,
    payload: photos
})

const updatePhoto = (photo) => ({
    type: EDIT_PHOTO,
    payload: photo
})

const deletePhoto = (photoId) => ({
    type: DELETE_PHOTO,
    payload: photoId
})


// Action Thunks
export const uploadPhotoThunk = (newPhoto) => async (dispatch) => {
    const { album, photo_img, description } = newPhoto;

    const response = await fetch(`/api/photos/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            album,
            photo_img,
            description
        })
    })

    if (response.ok) {
        const photo = await response.json();
        await dispatch(uploadPhoto(photo));
        return photo;
    }
}


export const getOnePhotoThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`);

    if (response.ok) {
        const photo = await response.json();
        await dispatch(getOnePhoto(photo));
        return photo
    }
}


export const getAllPhotosThunk = () => async (dispatch) => {
    const response = await fetch(`/api/photos`);

    if (response.ok) {
        const photos = await response.json();
        await dispatch(getAllPhotos(photos))
    }
}


export const userPhotosThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/photos/user/${userId}`);

    if (response.ok) {
        const photos = await response.json();
        await dispatch(userPhotos(photos))
        return photos
    }
}


export const updatePhotoThunk = (photo) => async (dispatch) => {
    const { id, album, photo_img, description } = photo;

    const response = await fetch(`/api/photos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            album,
            photo_img,
            description
        })
    })
    if (response.ok) {
        const editedPhoto = await response.json();
        await dispatch(updatePhoto(editedPhoto));
        return editedPhoto;
    }
}


export const deletePhotoThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const photo = await response.json();
        await dispatch(deletePhoto(photoId));
        return photo;
    }
}


const intialState = {
    allPhotos: {},
    singlePhoto: {},
    userPhotos: {}
};

const photoReducer = (state = intialState, action) => {
    let newState;
    switch (action.type) {
        case UPLOAD_PHOTO: {
            newState = { ...state };
            newState.allPhotos = { ...state.allPhotos };
            newState.allPhotos[action.payload.photo.id] = action.payload.photo;
            return newState;
        }
        case GET_PHOTO: {
            newState = { ...state };
            newState.singlePhoto = action.payload
            return newState;
        }
        case GET_ALL_PHOTOS: {
            newState = { allPhotos: {}, singlePhoto: {}, userPhotos: {} };
            const photos = action.payload
            newState.allPhotos = photos
            return newState
        }
        case USER_PHOTOS: {
            const newState = { ...state };
            newState.userPhotos = {};
            const photos = action.payload
            newState.userPhotos = photos
            return newState;
        }
        case EDIT_PHOTO: {
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        }
        case DELETE_PHOTO: {
            newState = { ...state };
            delete newState.allPhotos[action.payload]
            return newState
        }
        default:
            return state
    }
}


export default photoReducer
