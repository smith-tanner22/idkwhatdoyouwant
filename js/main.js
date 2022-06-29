import {
    generateCuisineForm,
    generatePriceForm,
    generateDiningForm
} from "./utils.js";

import ExternalServices from "./ExternalServices.js";
const externalServices = new ExternalServices();

const cuisineData = await externalServices.getCuisines();

generateCuisineForm(cuisineData);

const formbtn = document.querySelector('#CuisineBtn');
formbtn.addEventListener('click', (e) => {
    e.preventDefault();
    generatePriceForm();
    const priceBtn = document.querySelector('#PriceBtn');
    priceBtnStuff();
});


function priceBtnStuff() {
    const priceBtn = document.querySelector('#PriceBtn');
    console.log("inside priceBtnStuff");

    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateDiningForm();
    });
}