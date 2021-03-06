import { authHeader } from './authHeader';

export const overviewService = {
    approveOverviewRequest,
    rejectOverviewRequest,
    requestApartmentOverview,
    getApartmentOverviewRequests,
    getAccountOverviewRequests
};

function requestApartmentOverview(apartmentId, accountId, dateTime, comment) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  apartmentId, accountId, dateTime, comment})
    };

    return fetch("/api/overview/create", requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function getApartmentOverviewRequests(apartmentId) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        }
    };

    return fetch(`/api/overview/apartment/${apartmentId}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function getAccountOverviewRequests(accoutId) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        }
    };

    return fetch(`/api/overview/account/${accoutId}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function approveOverviewRequest(overviewId) {
    const currentUserId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentUserId })
    };

    return fetch(`/api/overview/${overviewId}/approve`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function rejectOverviewRequest(overviewId) {
const currentUserId = JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentUserId })
    };

    return fetch(`/api/overview/${overviewId}/reject`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

