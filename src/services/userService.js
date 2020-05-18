import { authHeader } from './authHeader';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const userService = {
    login,
    logout,
    getAll,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    console.log("Before login ")

    return fetch("/api/authenticate", requestOptions)
        .then(authHeader.handleAuthenticateResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                console.log("logining user info ")
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Saved user:")
                console.log(JSON.parse(localStorage.getItem('user')))
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
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

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader.addAuthHeader()
    };

    return fetch("/api/admin/all_users", requestOptions)
        .then(authHeader.handleResponse);
}
