function generateCuisineForm(data, outputContainer) {
    console.log(data);
    const nameC = "Cuisine";
    outputContainer.innerHTML = renderForm(nameC);
    let formData = [];
    const cuisineSet = new Set();
    
    data.map(entry => cuisineSet.add(entry.cuisineType));
    cuisineSet.forEach(thing => formData.push(thing));

    formData = formData.map(cuisineType => populateForm(cuisineType, ("." + nameC + "Container")));
    document.querySelector("." + nameC + "Container").innerHTML = formData.sort().join(' ');
}

function generatePriceForm(data, outputContainer) {
    const nameP = "Price";
    outputContainer.innerHTML = renderForm(nameP);
    let formData = [];
    const priceSet = new Set();
    // Get the selected cuisine options in storage
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));
    // If there is at least one cuisine option in local storage, filter it out of the
    // the possible price options and then populate the form
    if (Object.keys(cuisineInStorage).length > 0) {
        let originalArray = Object.values(data);
        let selectedValues = Object.values(cuisineInStorage);

        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.cuisineType));
        filteredArray.map(entry => priceSet.add(entry.price));

        priceSet.forEach(dollarSign => formData.push(dollarSign));
        console.log(formData);
        
        formData = formData.map(data => populateForm(data, ("." + nameP + "Container")));
        document.querySelector("." + nameP + "Container").innerHTML = formData.sort().join(' ');
        return data = filteredArray;
    }
    // If no options have been selected, just generate the form and return the original data
    else {
        data.map(entry => priceSet.add(entry.price));
        priceSet.forEach(dollarSign => formData.push(dollarSign));
        formData = formData.map(price => populateForm(price, ("." + nameP + "Container")));
        document.querySelector("." + nameP + "Container").innerHTML = formData.sort().join(' ');
        return data;
    }
}

function generateDiningForm(data, outputContainer) {
    const nameD = "Dining";
    outputContainer.innerHTML = renderForm(nameD);
    let formData = [];
    const diningSet = new Set();
    // Get the price in storage
    const priceInStorage = JSON.parse(localStorage.getItem("Price"));
    // If there is at least one price option in local storage, filter it out of the
    // the possible options and then populate the form
    if (Object.keys(priceInStorage).length > 0) {
        let originalArray = Object.values(data);
        let selectedValues = Object.values(priceInStorage);

        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.price));
        filteredArray.map(entry => diningSet.add(entry.opens));

        diningSet.forEach(time => formData.push(time));
        console.log(formData);

        formData = filteredArray.map(data => populateForm(data.opens, ("." + nameD + "Container")));
        document.querySelector("." + nameD + "Container").innerHTML = formData.sort().join(' ');
        return data = filteredArray
    }
    // If no options have been selected, just generate the form and return whatever was passed in
    else {
        data.map(entry => diningSet.add(entry.opens));
        diningSet.forEach(time => formData.push(time));
        formData = formData.map(time => populateForm(time, ("." + nameD + "Container")));
        document.querySelector("." + nameD + "Container").innerHTML = formData.sort().join(' ');
        return data;
    }
}

async function getResults(data) {
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));
    const priceInStorage = JSON.parse(localStorage.getItem("Price"));
    const diningInStorage = JSON.parse(localStorage.getItem("Dining"));
    // If at least one option was selected throughout the steps
    if (Object.keys(diningInStorage).length > 0 || Object.keys(priceInStorage).length > 0 ||
        Object.keys(cuisineInStorage).length > 0) {
        let originalArray = Object.values(data);
        let selectedValues = Object.values(diningInStorage);
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.opens));
        // If the array ends up being empty by the end
        if (filteredArray.length < 1) {
            console.log("Sorry, nothing in your area matched your criteria.")
        } else {
            getAllRestaurant(filteredArray);
            document.getElementById("title").innerHTML = "Results";
            const formData = filteredArray.map(entry => renderResults(entry));
            document.getElementById("testContainer").innerHTML = formData.sort().join(' ');
            // document.getElementById("#testContainer").innerHTML = results.join(' ');

        }
    } else {
        window.alert("You didn't select anything!");
    }
}

function renderForm(category) {
    document.getElementById("title").innerHTML = `Please select which ${category} you <span class="dont">DON'T</span> want`;
    return `<form class="genericForm" id="${category}Form">
    <h3 id="stepHeading">${category}</h3>
    <div id="itemsContainer" class="${category}Container">
    </div>
    <button class="button" id="${category}Btn" type="submit">Continue</button>
    </form>`;
}

function populateForm(data, outputContainer) {
    const form = document.querySelector(outputContainer);
    return form.innerHTML =
        `<div>
            <input name="${data}" id="${data}" type="checkbox" value="${data}">
            <label for="${data}">${data}</label>
        </div>`;
}

function renderResults(restaurant) {

    return document.getElementById("testContainer").innerHTML =
        `<a href="${restaurant.restaurantWebsite}">
    <div class="resultsContainer">
        <p class="resultsInfo">${restaurant.restaurantName}</p>
        <img src="${restaurant.imgUrl}">
    </div>
    </a>`;

    // return document.getElementById("testContainer").innerHTML = 
    // `<a href="${restaurantInfo.restaurantWebsite}">
    // <div class="resultsContainer">
    //     <img src="${restaurantInfo.picture}">
    //     <h3>${restaurantInfo.restaurantName}</h3>
    // </div>
    // </a>`;

}

async function getAllRestaurant(filtered) {
    const BaseURL = 'https://cse341-restaurant-picker.herokuapp.com/';
         return await fetch(`${BaseURL}restaurants`)
            .then(response => response.json())
            .then(json => {
            console.log(json)
            const myArrayFiltered = json.filter((el) => {
            return filtered.some((f) => {
                    return f._id === el.cuisine;
                });
                });
            console.log(myArrayFiltered)
            })
            .catch((error)=>{console.log(error.message)})
        
    }

function setLocalStorage(key) {
    var myForm = document.getElementById(key + "Form");
    const formed = formDataToJSON(myForm);
    // console.log(formed);
    localStorage.setItem(key, formed);
}

function formDataToJSON(formElement) {
    let formData = new FormData(formElement);
    const converted = Object.fromEntries(formData.entries());
    // console.log(converted);
    // converted.tags = formData.getAll("CuisineTag");
    return JSON.stringify(converted);
}

export function renderWithTemplate(parent, template, data, callback) {
    const clone = template.content.cloneNode(true);
    if (callback) {
        clone = callback(clone, data);
    }
    parent.appendChild(clone);
}

function convertToText(res) {
    // console.log(res);
    if (res.ok) {
        return res.text();
    } else {
        throw new Error('No path');
    }
}
export async function loadTemplate(path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}

export async function loadHeaderFooter() {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    // console.log(header);
    // console.log(footer);
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(headerElement, header);
    renderWithTemplate(footerElement, footer);
}

export {
    generateCuisineForm,
    setLocalStorage,
    generatePriceForm,
    generateDiningForm,
    getResults
};