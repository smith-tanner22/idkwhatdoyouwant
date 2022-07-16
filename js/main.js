import {
    generateCuisineForm,
    setLocalStorage,
    generatePriceForm,
    generateDiningForm,
    getResults,
    loadHeaderFooter
} from "./utils.js";
import ExternalServices from "./ExternalServices.js";

// Generate header and footer onto the page.
loadHeaderFooter();

const externalServices = new ExternalServices();

/*************************STEP ONE****************************************** */

// Get all the restaurants from the database.
var foodData = await externalServices.getCuisines();
// We target this element a lot, so it's a variable for ease of typing.
const outputContainer = document.getElementById("testContainer");
// Clear local storage every time a new session is loaded.
localStorage.clear();
// Generate the initial form with cuisine options.
generateCuisineForm(foodData, outputContainer);

/*************************STEP TWO*******************************************/
const cuisineBtn = document.querySelector('#CuisineBtn');
// Once the button is generated, add an event listener to it.
if (cuisineBtn) {
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Set a local storage key to "Cuisine" to store selected cuisine options.
    setLocalStorage("Cuisine");
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));

    // Initialize a Set to save unique cuisine types, then add those into an array.
    let comparator = new Set();
    foodData.map(entry => comparator.add(entry.cuisineType));
    
    // If they selected everything.
    if (comparator.size === Object.keys(cuisineInStorage).length){
        window.alert("You selected everything. Please allow at least one option available.");
    } else {
    // Change foodData to now exclude the selected cuisine options.
    foodData = generatePriceForm(foodData, outputContainer);
    priceBtnStuff();
    }
});
}

/*************************STEP THREE*******************************************/
function priceBtnStuff() {
    // Pretty much all the same logic as above, just now with the price.
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Price");
        const priceInStorage = JSON.parse(localStorage.getItem("Price"));
        let comparator = new Set();
        foodData.map(entry => comparator.add(entry.price));
        
        if (comparator.size === Object.keys(priceInStorage).length){
            window.alert("You selected everything. Please leave at least one option available.");
        } else {
        // Change foodData to now also exclude price options
        foodData = generateDiningForm(foodData, outputContainer);
        diningStuff();
        }
    });
}

/*************************FINAL STEP*******************************************/
function diningStuff() {
    // Same thing as before.
    const diningBtn = document.querySelector("#DiningBtn");
    diningBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Dining");
        const diningInStorage = JSON.parse(localStorage.getItem("Dining"));
        let comparator = new Set();
        foodData.map(entry => comparator.add(entry.diningStyle));
        
        if (comparator.size === Object.keys(diningInStorage).length){
            window.alert("You selected everything. Please leave at least one option available.");
        } else {
        /* The final change will be made in getResults, which will eventually show all the restaurants
        that fit the data that's left. */
        getResults(foodData)
        }
    });
}

function redirect() {
    var url = "https://cse341-restaurant-picker.herokuapp.com/login";
    window.location.href = url;
}


/**************** Contributers ****************/
/*
Kevin Whittaker - kevbotty@gmail.com
Tanner Smith - 
Lakeram Narine - 
*/