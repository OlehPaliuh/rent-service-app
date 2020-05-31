import { authHeader } from './authHeader';

export const commentService = {
    addComment,
    deleteComment
};

function addComment(apartmentId, content) {
    
    const accountId =  JSON.parse(localStorage.getItem('user')).id;

    const owner = {
        id: accountId
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content,  owner })
    };

    return fetch(`/api/apartment/comment/${apartmentId}/add`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function deleteComment(id) {
    
    const accountId =  JSON.parse(localStorage.getItem('user')).id;

    const owner = {
        id: accountId
    }


    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ owner })
    };

    return fetch(`/api/apartment/comment/${id}/delete`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}


