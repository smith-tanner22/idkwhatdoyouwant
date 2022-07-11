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
localStorage.clear();
generateCuisineForm(foodData, outputContainer);

/*************************STEP TWO****************************************** */
const cuisineBtn = document.querySelector('#CuisineBtn');
if(cuisineBtn){
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear local storage so it's a fresh start every time
    setLocalStorage("Cuisine");
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));
    
    // If they selected everything
    if (foodData.length === Object.keys(cuisineInStorage).length){
        window.alert("You selected everything");
    } else {
    // Change foodData to now exclude the selected cuisine options
    foodData = generatePriceForm(foodData, outputContainer);
    priceBtnStuff();
    }
});
}


// Step Three
function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Price");
        const priceInStorage = JSON.parse(localStorage.getItem("Price"));
        
        if (foodData.length === Object.keys(priceInStorage).length){
            window.alert("You selected everything");
        } else {
        // Change foodData to now also exclude price options
        foodData = generateDiningForm(foodData, outputContainer);
        diningStuff();
        }
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