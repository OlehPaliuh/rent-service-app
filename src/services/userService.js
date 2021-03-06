import { authHeader } from './authHeader';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const userService = {
    login,
    logout,
    getAll,
    register,
    getUserDetails,
    getOwnerAccountDetails,
    updateAccount,
    deleteOwnAccount,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch("/api/authenticate", requestOptions)
        .then(authHeader.handleAuthenticateResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('sortBy');
    localStorage.removeItem('filter');
    localStorage.removeItem('user');
}

function register(user) {

    const { firstName, lastName, email, password, username, phoneNumber } = user

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, username, phoneNumber })
    };

    return fetch("/api/register", requestOptions)
        .then(authHeader.handleAuthenticateResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function updateAccount(prifile) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prifile)
    };

    const accountId = JSON.parse(localStorage.getItem('user')).id;

    return fetch(`/api/user/account/${accountId}/update`, requestOptions)
        .then(authHeader.handleResponse)
        .then(response => response.json());
}

function getUserDetails(accountId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch(`/api/user/account/${accountId}`, requestOptions)
        .then(authHeader.handleResponse)
        .then(response => response.json());
}

function getOwnerAccountDetails(accountId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch(`/api/user/account/owner/${accountId}`, requestOptions)
        .then(authHeader.handleResponse)
        .then(response => response.json());
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch("/api/admin/all_users", requestOptions)
        .then(authHeader.handleResponse);
}

function deleteOwnAccount(accountId, reason) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
        }
    };

    return fetch(`/api/user/account/${accountId}/deleteOwnAccount?reason=${reason}`, requestOptions)
        .then(authHeader.handleResponse)
        .then(response => response.json());
}


