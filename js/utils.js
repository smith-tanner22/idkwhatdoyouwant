function generateCuisineForm(data, outputContainer) {
    // const container1 = document.getElementById("stepContainer");
    // container1.innerHTML = renderForm(nameC);
    const nameC = "Cuisine";
    outputContainer.innerHTML = renderForm(nameC);

    const formData = data.map(data => populateForm(data.name, ("." + nameC + "Container")));
    document.querySelector("." + nameC + "Container").innerHTML = formData.join(' ');

    document.querySelector('#' + nameC + "Form").addEventListener('submit', logData);
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
    // console.log(`This works: ${name}`);

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

async function logData(e) {
    e.preventDefault();
    var myForm = e.target;
    formDataToJSON(myForm);
}

function formDataToJSON(formElement) {    
    let formData = new FormData(formElement);
    // Object.fromEntries creates a new object made from an iterable list like an Array or Map
    // Object.entries takes an object and converts it into an Array that is iterable.
    const converted = Object.fromEntries(formData.entries());
    console.log(converted);
    // if we have radios or checkboxes which share the same name
    converted.tags = formData.getAll("CuisineTag");
    console.table(converted);
    // return converted;
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

export {
    generateCuisineForm,
    generatePriceForm,
    generateDiningForm,
    getResults
};