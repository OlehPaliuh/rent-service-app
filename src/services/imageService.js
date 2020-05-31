import { authHeader } from './authHeader';

export const imageService = {
    uploadImage,
    deleteImage,
    updateProfileImage
};

function uploadImage(files) {

    const formData = new FormData();
    for (var x = 0; x < files.length; x++) {
        formData.append("files", files[x]);
    }

    const accountId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        },
        body: formData
    };

    return fetch(`/api/image/${accountId}/save`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function updateProfileImage(file) {

    const formData = new FormData();
    formData.append("file", file);

    const accountId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader()
        },
        body: formData
    };

    return fetch(`/api/user/account/${accountId}/updateAvatar`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function deleteImage(filePath) {

    const accountId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch(`/api/image/${accountId}/delete?filePath=${filePath}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}



