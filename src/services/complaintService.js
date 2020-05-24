import { authHeader } from './authHeader';
import { BehaviorSubject } from 'rxjs';

export const complaintService = {
    createComplaint
};

function createComplaint(accountToId, accountFromId, complaintTitle, complaintContent, complaintSeverity) {
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': authHeader.addAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ complaintTitle, complaintContent, complaintSeverity })
    };

    return fetch(`/api/complaint/${accountFromId}/${accountToId}/create`, requestOptions)
    .then(authHeader.handleResponse)
    .then(response => response.json());
}
