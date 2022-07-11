import {
    generateCuisineForm,
    setLocalStorage,
    generatePriceForm,
    generateDiningForm,
    getResults,
    loadHeaderFooter
} from "./utils.js";

loadHeaderFooter();

import ExternalServices from "./ExternalServices.js";



const externalServices = new ExternalServices();

/*************************STEP ONE****************************************** */

// Changed to "var" so that it can be manipulated
var foodData = await externalServices.getCuisines();
const outputContainer = document.getElementById("testContainer");
generateCuisineForm(foodData, outputContainer);



/*************************STEP TWO****************************************** */
const cuisineBtn = document.querySelector('#CuisineBtn');
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear local storage so it's a fresh start every time
    localStorage.clear();
    setLocalStorage("Cuisine");
    // Change foodData to now exclude the selected cuisine options
    foodData = generatePriceForm(foodData, outputContainer);
    priceBtnStuff();
});


// Step Three
function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Price");
        // Change foodData to now also exclude price options
        foodData = generateDiningForm(foodData, outputContainer);
        diningStuff();
    });
}


// Final step
function diningStuff() {
    const diningBtn = document.querySelector("#DiningBtn");
    diningBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Dining");
        // The final change will be made in getResults, which will eventually show all the restaurants
        // that fit the data that's left
        getResults(foodData)
    });
}

document.querySelector(".login-btn").addEventListener("click", redirect);

function redirect() {
var url = "https://cse341-restaurant-picker.herokuapp.com/login";
window.location.href = url;
}