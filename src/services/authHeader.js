import { userService } from "./userService"

export const authHeader = {
    addAuthHeader,
    handleAuthenticateResponse,
    handleResponse,
    getAccessToken
};

function addAuthHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

function handleAuthenticateResponse(response) {
    return response.text().then(text => {
        console.log("Text")
        console.log(text)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            userService.logout();
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function handleResponse(response) {
    console.log(response);
    if (!(response.ok || response.created)) {
        if (response.status === 401) {
            console.log("Error 401 start")
            const user = JSON.parse(localStorage.getItem('user'));
            getAccessToken(user.refreshToken);
        } else if (response.message === "REFRESH_TOKEN_NOT_VALID") {
            userService.logout();
        }
        const error = (response && response.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}

function getAccessToken(refreshToken) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch("/api/updateAccessToken?refreshToken=" + refreshToken, requestOptions)
        .then(handleAuthenticateResponse)
        // .then(response => response.json()) 
        .then(user => {
            if (user) {
                console.log("Update user infor with refresh tocken");
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}