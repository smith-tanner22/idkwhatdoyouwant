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
const cuisineData = await externalServices.getCuisines();
const outputContainer = document.getElementById("testContainer");
generateCuisineForm(cuisineData, outputContainer);


// Grab local storage


/*************************STEP TWO****************************************** */
const cuisineBtn = document.querySelector('#CuisineBtn');
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setLocalStorage("Cuisine");
    generatePriceForm(cuisineData, outputContainer);
    priceBtnStuff();
});


// Step Three
function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Price");
        generateDiningForm(cuisineData, outputContainer);
        diningStuff();
    });
}


// Final step
function diningStuff() {
    const diningBtn = document.querySelector("#DiningBtn");
    diningBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Dining");
        getResults("Success!")
    });
}