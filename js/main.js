import {
    generateCuisineForm,
    generatePriceForm,
    generateDiningForm
} from "./utils.js";




generateCuisineForm();

const formbtn = document.querySelector('#CuisineBtn');
formbtn.addEventListener('click', (e) => {
    e.preventDefault();
    generatePriceForm();
});

const priceBtn = document.querySelector('#PriceBtn');
if (priceBtn) {
    console.log("priceBtn exists");
    priceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateDiningForm();
    });
}