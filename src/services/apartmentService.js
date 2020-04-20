import { authHeader } from './authHeader';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const apartmentService = {
    getAllApatments,
    createApatment,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function getAllApatments() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader.addAuthHeader()
    };

    return fetch("/api/apartment/all", requestOptions)
    .then(authHeader.handleResponse);
}

function createApatment(apartment) {

    const {  name1, description, numberOfRooms, price, area, address, tags } = apartment

    const accountId =  JSON.parse(localStorage.getItem('user')).id;

    console.log(accountId);

    const requestOptions = {
        method: 'POST',
        headers: authHeader.addAuthHeader(),
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  name1, description, numberOfRooms, price, area, address, tags, accountId })
    };

    return fetch("/api/apartment/create", requestOptions)
    .then(authHeader.handleResponse);
}