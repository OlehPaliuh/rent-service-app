import { authHeader } from './authHeader';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const realtyService = {
    getAllRealty,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function getAllRealty() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader.addAuthHeader()
    };

    return fetch("/api/realty/all", requestOptions)
    .then(authHeader.handleResponse);
}