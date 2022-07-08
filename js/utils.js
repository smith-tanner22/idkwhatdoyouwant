function generateCuisineForm(data, outputContainer) {
    const nameC = "Cuisine";
    outputContainer.innerHTML = renderForm(nameC);

    const formData = data.map(data => populateForm(data.name, ("." + nameC + "Container")));
    document.querySelector("." + nameC + "Container").innerHTML = formData.join(' ');
}

function generatePriceForm(data, outputContainer) {
    const nameP = "Price";
    outputContainer.innerHTML = renderForm(nameP);
    // Get the selected options in storage
    const cuisineInStorage = JSON.parse(localStorage.getItem("Cuisine"));
    if (Object.keys(cuisineInStorage).length > 0) {

        /********************Filter local storage data************************** */
        let originalArray = Object.values(data);
        let selectedValues = Object.values(cuisineInStorage);
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.name));
        console.log(filteredArray);
        
        const formData = filteredArray.map(data => populateForm(data._id, ("." + nameP + "Container")));
        document.querySelector("." + nameP + "Container").innerHTML = formData.join(' ');
        return data = filteredArray;
    }
    else {
        const formData = data.map(data => populateForm(data._id, ("." + nameP + "Container")));
        document.querySelector("." + nameP + "Container").innerHTML = formData.join(' ');
        return data;
    }
}

function generateDiningForm(data, outputContainer) {
    const nameD = "Dining";
    outputContainer.innerHTML = renderForm(nameD);
    const priceInStorage = JSON.parse(localStorage.getItem("Price"));
    if (Object.keys(priceInStorage).length > 0) {
        let originalArray = Object.values(data);
        let selectedValues = Object.values(priceInStorage);
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item._id));
        console.log(filteredArray);
        
        const formData = filteredArray.map(data => populateForm(data.description, ("." + nameD + "Container")));
        document.querySelector("." + nameD + "Container").innerHTML = formData.join(' ');
        return data = filteredArray
    }
    else {
        const formData = data.map(data => populateForm(data.description, ("." + nameD + "Container")));
        document.querySelector("." + nameD + "Container").innerHTML = formData.join(' ');
    }
}

function getResults(data) {
    const diningInStorage = JSON.parse(localStorage.getItem("Dining"));
    if (Object.keys(diningInStorage).length > 0) {
        let originalArray = Object.values(data);
        let selectedValues = Object.values(diningInStorage);
        let filteredArray = originalArray.filter(item => !selectedValues.includes(item.description));
        console.log(filteredArray);
    }
    else {
        console.log("Success!");
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
        `<div class="group">
            <input name="${data}" type="checkbox" value="${data}">
            <label for="${data}">${data}</label>
        </div>`;
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

// function renderDynamicForm(name, data) {
//     const newForm = `<form class="${name}" action="">
//     <h3 id="stepHeading">${name}</h3>
//     <div class="container">
//         <input name="chinese" type="checkbox">
//         <label for="chinese">something else</label>
//         <input name="bbq" type="checkbox">
//         <label for="bbq">BBQ</label>
//         <input name="mexican" type="checkbox">
//         <label for="mexican">Mexican</label>
//     </div>
//     <button class="button" id="${name}Btn" type="submit">Continue</button>
// </form>`;
//     return newForm;
// }

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