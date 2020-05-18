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
    .then(authHeader.handleResponse)
    .then(response => response.json(),
        error => {console.error(error) 
            return []});
}

function createApatment(apartment, location, imageLinks) {

    const {  title, description, numberOfRooms, price, area, tags } = apartment
    
    const accountId =  JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: authHeader.addAuthHeader(),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  title, description, numberOfRooms, price, area, location, tags, accountId, imageLinks})
    };

    return fetch("/api/apartment/create", requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}