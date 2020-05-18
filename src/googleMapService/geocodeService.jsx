
export const geocodeService = {
    getAutocompleteAdress,
    getPlaceByPlaceId
};

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

function getAutocompleteAdress(address) {
    const requestOptions = {
        method: 'GET'
    };

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${address}&inputtype=textquery&components=country:ua&language=uk`

    return fetch(proxyUrl + url, requestOptions)
        .then(response => response.json())
        .then(data => data.predictions)
        .catch(() => {
            console.log("Can’t access! Blocked by browser?")
            return []
        });
}

function getPlaceByPlaceId(place_id) {
    const requestOptions = {
        method: 'GET'
    };

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${API_KEY}`

    return fetch(proxyUrl + url, requestOptions)
        .then(response => response.json())
        .catch(() => {
            console.log("Can’t access! Blocked by browser?")
            return []
        });
}