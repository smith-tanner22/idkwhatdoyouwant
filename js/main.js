import {
    generateCuisineForm,
    generatePriceForm,
    generateDiningForm,
    getResults
} from "./utils.js";

import ExternalServices from "./ExternalServices.js";

const externalServices = new ExternalServices();
var checkedOptions = {};
const cuisineData = await externalServices.getCuisines();
const outputContainer = document.getElementById("testContainer");

generateCuisineForm(cuisineData, outputContainer);


const cuisineBtn = document.querySelector('#CuisineBtn');
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generatePriceForm(cuisineData, outputContainer);
    priceBtnStuff();
});


function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateDiningForm(cuisineData, outputContainer);
        diningStuff();
    });
}

function diningStuff() {
    const diningBtn = document.querySelector("#DiningBtn");
    diningBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getResults("Success!")
    });
}