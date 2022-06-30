function generateCuisineForm(data) {
    // const container1 = document.getElementById("stepContainer");
    // container1.innerHTML = renderForm(nameC);
    const nameC = "Cuisine";
    const testContainer = document.getElementById("testContainer");
    testContainer.innerHTML = renderForm(nameC);

    const formData = data.map(data => populateForm(data.name, nameC));
    document.querySelector("." + nameC + "Container").innerHTML = formData.join(' ');
}

function generatePriceForm(data) {
    const testContainer = document.getElementById("testContainer");
    const nameP = "Price";
    testContainer.innerHTML = renderForm(nameP);

    const formData = data.map(data => populateForm(data._id, nameP));
    document.querySelector("." + nameP + "Container").innerHTML = formData.join(' ');
}

function generateDiningForm(data) {
    const testContainer = document.getElementById("testContainer");
    const nameD = "Dining";
    
    testContainer.innerHTML = renderForm(nameD);
    const formData = data.map(data => populateForm(data.description, nameD));
    document.querySelector("." + nameD + "Container").innerHTML = formData.join(' ');
}

function getResults(results) {
    console.log(results);
}
function renderForm(category) {
    // console.log(`This works: ${name}`);

    return `<form class="${category}" action="">
    <h3 id="stepHeading">${category}</h3>
    <div class="${category}Container">
    </div>
    <button class="button" id="${category}Btn" type="submit">Continue</button>
    </form>`;
}

function populateForm(data, option) {
    const where = document.querySelector("." + option + "Container");
    return where.innerHTML = `<input name="${data}" type="checkbox">
        <label for="${data}">${data}</label>`;
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