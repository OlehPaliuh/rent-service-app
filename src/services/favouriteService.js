import { authHeader } from './authHeader';

export const favouriteService = {
    addToFavourite,
    removeFromFavourite
};

function addToFavourite(apartmentId) {

    const accountId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch(`/api/favourite/${accountId}/add/${apartmentId}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function removeFromFavourite(apartmentId) {

    const accountId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch(`/api/favourite/${accountId}/delete/${apartmentId}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}



