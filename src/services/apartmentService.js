import { authHeader } from './authHeader';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const apartmentService = {
    getAllApatments,
    createApatment,
    getFilteredApartment,
    updateApartmentStatus,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function getAllApatments(sort) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader()
        }
    };

    console.log(sort);

    return fetch(`/api/apartment/all?sortBy=${sort}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json(),
        error => {console.error(error) 
            return []});
}

function createApatment(apartment, location, imageLinks) {

    const {  title, description, numberOfRooms, price, area, tags,
        totalArea, livingArea, allowPets, buildingType, floor } = apartment
    
    const accountId =  JSON.parse(localStorage.getItem('user')).id;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  title, description, totalArea, livingArea, allowPets, buildingType, floor, numberOfRooms, price, area, location, tags, accountId, imageLinks})
    };

    return fetch("/api/apartment/create", requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function getFilteredApartment(apartmentFilter, sort) {

    console.log(sort);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apartmentFilter)
    };

    return fetch(`/api/apartment/filtering?sortBy=${sort}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

function updateApartmentStatus(apartmentId, status) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        }
    };

    return fetch(`/api/apartment/${apartmentId}/status/update?status=${status}`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}

// function getSortedApartments(sort) {

// console.log(sort)

//     const requestOptions = {
//         method: 'GET',
//         headers: {
//             'Authorization': authHeader.addAuthHeader(),
//             'Content-Type': 'application/json'
//         }
//     };

//     return fetch(`/api/apartment/sort?sortBy=${sort}`, requestOptions)
//     .then(authHeader.handleResponse)
//     .then(response => response.json());
// }