import { authHeader } from './authHeader';

export const searchService = {
    search
};

function search(searchString) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json' }
    };

    return fetch(`/api/search?q=${searchString}`, requestOptions)
        .then(authHeader.handleResponse)
        .then(response => response.json());
}
