function generateCuisineForm(data, outputContainer) {
    // Set a name that will be used to identify elements in the form we will create.
    const nameC = "Cuisine";

    // Render some empty HTML with the names specified above to be targeted later.
    outputContainer.innerHTML = renderForm(nameC);

    // Set up an array and a Set that will be used to display certain data.
    let formData = [];
    const cuisineSet = new Set();

    /* Look at everything in the data we get from the database and add each cuisine type to
    the Set. Only one unique type for each will be added to it to then show on the screen. */
    data.map(entry => cuisineSet.add(entry.cuisineType));

    // The set is an object, so we loop through and save those unique types into the array.
    cuisineSet.forEach(thing => formData.push(thing));
    
    // Send each array item to populate the HTML we set up with some selectable buttons.
    formData = formData.map(cuisineType => populateForm(cuisineType, ("." + nameC + "Container")));
    document.querySelector("." + nameC + "Container").innerHTML = formData.sort().join(' ');
}

function generatePriceForm(data, outputContainer) {
    const nameP = "Price";
    outputContainer.innerHTML = renderForm(nameP);
    let formData = [];
    const priceSet = new Set();
    // Get the selected cuisine options that have been saved in local storage.
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));
    /* If there is at least one cuisine option in local storage, filter it out of the
    possible price options and then populate the form */
    if (Object.keys(cuisineInStorage).length > 0) {
        // Get the properties of each item in the data and save them into an array.
        let originalArray = Object.values(data);
        // Save all the local storage options into an array.
        let selectedValues = Object.values(cuisineInStorage);
        /* Filter through the original data and save any item whose cuisine type wasn't selected
        on the previous form. */
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.cuisineType));
        /* Loop through that new array and save the available prices into a Set, keeping one of
        each unique value. */
        filteredArray.map(entry => priceSet.add(entry.price));
        // Put those unique values into an array
        priceSet.forEach(dollarSign => formData.push(dollarSign));
        // Populate form with unique values of item price
        formData = formData.map(data => populateForm(data, ("." + nameP + "Container")));
        document.querySelector("." + nameP + "Container").innerHTML = formData.sort().join(' ');
        // Return the array whose data contains the items that have been left in after the filter.
        return data = filteredArray;
    }
    // If no options have been selected, just generate the form and return the original data
    else {
        // Populate the form with unique values and return the unaltered data.
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
    // Get the price options in local storage.
    const priceInStorage = JSON.parse(localStorage.getItem("Price"));
    /* If there is at least one price option in local storage, filter them out of the
    the possible options and then populate the form. */
    if (Object.keys(priceInStorage).length > 0) {
        // Same logic as generatePriceForm, this time using the prices to filter.
        let originalArray = Object.values(data);
        let selectedValues = Object.values(priceInStorage);
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.price));
        filteredArray.map(entry => diningSet.add(entry.diningStyle));
        diningSet.forEach(diningStyle => formData.push(diningStyle));
        /* Here I don't let the "Dine-in & Drive-thru" option to be available because if it
        is selectable, then that means the user wants neither dine-in nor drive-thru, which
        makes no sense. */
        formData = formData.map(data => { 
            if (data != "Dine-in & Drive-thru") {
                console.log(data);
            return populateForm(data, ("." + nameD + "Container"));
            }
        });
        document.querySelector("." + nameD + "Container").innerHTML = formData.join(' ');
        return data = filteredArray
    }
    // If no options have been selected, just generate the form and return whatever was passed in
    else {
        data.map(entry => diningSet.add(entry.diningStyle));
        diningSet.forEach(time => formData.push(time));
        formData = formData.map(data => { 
            if (data != "Dine-in & Drive-thru") {
                console.log(data);
            return populateForm(data, ("." + nameD + "Container"));
            }
        });
        document.querySelector("." + nameD + "Container").innerHTML = formData.sort().join(' ');
        return data;
    }
}

async function getResults(data) {
    // Get all the values in local storage.
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));
    const priceInStorage = JSON.parse(localStorage.getItem("Price"));
    const diningInStorage = JSON.parse(localStorage.getItem("Dining"));
    // If at least one option was selected throughout the steps.
    if (Object.keys(diningInStorage).length > 0 || Object.keys(priceInStorage).length > 0 ||
        Object.keys(cuisineInStorage).length > 0) {
        let originalArray = Object.values(data);
        let selectedValues = Object.values(diningInStorage);
        // This time filter by dining style.
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.diningStyle));
        // If the array ends up being empty after being filtered.
        if (filteredArray.length < 1) {
            window.alert("Sorry, nothing in your area matched your criteria.")
        } else {
            getAllRestaurant(filteredArray);
            document.getElementById("title").innerHTML = "Results";
            const formData = filteredArray.map(entry => renderResults(entry));
            document.getElementById("testContainer").innerHTML = formData.sort().join(' ');
            // document.getElementById("#testContainer").innerHTML = results.join(' ');

        }
    } else {
        window.alert("You didn't select anything! I guess we'll show you everything.");
        // Now we get all the restaurants whose options weren't selected.
        getAllRestaurants(data);
        document.getElementById("title").innerHTML = "Results";
        const formData = data.map(entry => renderResults(entry));
        document.getElementById("testContainer").innerHTML = formData.sort().join(' ');
    }
}

// These are the form templates that are dynamically populated.
function renderForm(category) {
    document.getElementById("title").innerHTML = `Please select which <span class="lowercase">${category}</span> you <span class="dont">DON'T</span> want`;
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

// Generate the list of availible restaurants with names, clickable logos and website links.
function renderResults(restaurant) {
    return document.getElementById("testContainer").innerHTML =
        `<a href="${restaurant.restaurantWebsite}">
    <div class="resultsContainer">
        <p class="resultsInfo">${restaurant.restaurantName}</p>
        <img src="${restaurant.imgUrl}">
    </div>
    </a>`;
}

// Get the restaurants that fit the criteria.
async function getAllRestaurants(filtered) {
    const BaseURL = 'https://cse341-restaurant-picker.herokuapp.com/';
    return await fetch(`${BaseURL}restaurants`)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            const myArrayFiltered = json.filter((el) => {
                return filtered.some((f) => {
                    return f._id === el.cuisine;
                });
            });
            console.log(myArrayFiltered)
        })
        .catch((error) => {
            console.log(error.message)
        })
}

// Set selected options into local storage.
function setLocalStorage(key) {
    var myForm = document.getElementById(key + "Form");
    const formed = formDataToJSON(myForm);
    // console.log(formed);
    localStorage.setItem(key, formed);
}

// Convert form data to JSON and return it (obviously).
function formDataToJSON(formElement) {
    let formData = new FormData(formElement);
    const converted = Object.fromEntries(formData.entries());
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