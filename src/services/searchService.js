import { authHeader } from './authHeader';

export const searchService = {
    search
};

function search(searchString) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader.addAuthHeader(),
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/api/search?q=${searchString}`, requestOptions)
        .then(authHeader.handleResponse)
        .then(response => response.json());
}
