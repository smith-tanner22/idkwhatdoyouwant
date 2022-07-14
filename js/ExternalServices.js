const BaseURL = 'https://cse341-restaurant-picker.herokuapp.com/';

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw {
            name: 'servicesError',
            message: jsonResponse
        };
    }
}

export default class ExternalServices {
    constructor() {

        //this.category = category;
        // this.path = `../json/${this.category}.json`;
    }

    static getRestaurants(lat, lng) {
        return fetch(`${BaseURL}restaurants?lat=${lat}&lng=${lng}`)
            .then(response => response.json())
            .then(json => json.restaurants);
    }

    static getRestaurant(id) {
        return fetch(`${BaseURL}restaurants/${id}`)
            .then(response => response.json())
            .then(json => json.restaurant);
    }

    static getReviews(id) {
        return fetch(`${BaseURL}restaurants/${id}/reviews`)
            .then(response => response.json())
            .then(json => json.reviews);
    }

    static getUser(id) {
        return fetch(`${BaseURL}users/${id}`)
            .then(response => response.json())
            .then(json => json.user);
    }

    static getUsers() {
        return fetch(`${BaseURL}users`)
            .then(response => response.json())
            .then(json => json.users);
    }

    static getUserReviews(id) {
        return fetch(`${BaseURL}users/${id}/reviews`)
            .then(response => response.json())
            .then(json => json.reviews);
    }

    static getUserRestaurants(id) {
        return fetch(`${BaseURL}users/${id}/restaurants`)
            .then(response => response.json())
            .then(json => json.restaurants);
    }

    static getUserRestaurant(userId, restaurantId) {
        return fetch(`${BaseURL}users/${userId}/restaurants/${restaurantId}`)
            .then(response => response.json())
            .then(json => json.restaurant);
    }

    static getUserReview(userId, reviewId) {
        return fetch(`${BaseURL}users/${userId}`)

    }

    async getCuisines() {
        return await fetch(`${BaseURL}restaurants`)
            .then(convertToJson).then((data) => data).catch(err => console.log(err));
        // return fetch(`${BaseURL}cuisines`)
        //     .then(response => response.json())
        //     .then(json => {
        //         json.cuisines
        //         console.log(json.cuisines);
        //     });
    }
}