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
const cuisineData = await externalServices.getCuisines();
const outputContainer = document.getElementById("testContainer");

generateCuisineForm(cuisineData, outputContainer);

const cuisineBtn = document.querySelector('#CuisineBtn');
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setLocalStorage("Cuisine");
    generatePriceForm(cuisineData, outputContainer);
    priceBtnStuff();
});


function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Price");
        generateDiningForm(cuisineData, outputContainer);
        diningStuff();
    });
}

function diningStuff() {
    const diningBtn = document.querySelector("#DiningBtn");
    diningBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLocalStorage("Dining");
        getResults("Success!")
    });
}