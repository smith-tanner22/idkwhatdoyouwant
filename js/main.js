import {
    generateCuisineForm,
    generatePriceForm,
    generateDiningForm,
    getResults
} from "./utils.js";

import ExternalServices from "./ExternalServices.js";
const externalServices = new ExternalServices();

const cuisineData = await externalServices.getCuisines();

generateCuisineForm(cuisineData);

const cuisineBtn = document.querySelector('#CuisineBtn');
cuisineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generatePriceForm(cuisineData);
    // const priceBtn = document.querySelector('#PriceBtn');
    priceBtnStuff();
});


function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateDiningForm(cuisineData);
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