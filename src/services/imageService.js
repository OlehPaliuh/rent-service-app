import { authHeader } from './authHeader';

export const imageService = {
    uploadImage
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

