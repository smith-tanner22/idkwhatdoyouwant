function generateCuisineForm(data, outputContainer) {
    const nameC = "Cuisine";
    outputContainer.innerHTML = renderForm(nameC);

    const formData = data.map(data => populateForm(data.name, ("." + nameC + "Container")));
    document.querySelector("." + nameC + "Container").innerHTML = formData.join(' ');

    // document.getElementById("CuisineForm").addEventListener('submit', cuisineInStorage);
}

function generatePriceForm(data, outputContainer) {
    const nameP = "Price";
    outputContainer.innerHTML = renderForm(nameP);

    const formData = data.map(data => populateForm(data._id, ("." + nameP + "Container")));
    document.querySelector("." + nameP + "Container").innerHTML = formData.join(' ');

}

function generateDiningForm(data, outputContainer) {
    const nameD = "Dining";
    outputContainer.innerHTML = renderForm(nameD);
    
    const formData = data.map(data => populateForm(data.description, ("." + nameD + "Container")));
    document.querySelector("." + nameD + "Container").innerHTML = formData.join(' ');
}

function getResults(results) {
    console.log(results);
}

function renderForm(category) {
    return `<form id="${category}Form">
    <h3 id="stepHeading">${category}</h3>
    <div class="${category}Container">
    </div>
    <button class="button" id="${category}Btn" type="submit">Continue</button>
    </form>`;
}

function populateForm(data, outputContainer) {
    const form = document.querySelector(outputContainer);
    return form.innerHTML = `<input name="${data}Option" type="checkbox" value="${data}">
        <label for="${data}">${data}</label>`;
}

function setLocalStorage(key) {
    var myForm = document.getElementById(key + "Form");
    const formed = formDataToJSON(myForm);
    console.log(formed);
    localStorage.setItem(key, formed);
}

function formDataToJSON(formElement) {    
    let formData = new FormData(formElement);
    const converted = Object.fromEntries(formData.entries());
    // console.log(converted);
    // converted.tags = formData.getAll("CuisineTag");
    return JSON.stringify(converted);
}

export {
    generateCuisineForm,
    setLocalStorage,
    generatePriceForm,
    generateDiningForm,
    getResults
};