import { authHeader } from './authHeader';

export const apartmentService = {
    getAllApatments,
    createApatment,
    getFilteredApartment,
    updateApartmentStatus,
    deleteApartment
};

function getAllApatments(sort) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeader.addAuthHeader()
        }
    };

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

function deleteApartment(apartmentId) {

    const accountId =  JSON.parse(localStorage.getItem('user')).id;

    const account = {
        id: accountId
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    };

    return fetch(`/api/apartment/${apartmentId}/delete`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}