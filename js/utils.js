function generateCuisineForm() {
    const container1 = document.getElementById("stepContainer");

    const nameC = "Cuisine";


    container1.innerHTML = renderForm(nameC);
}

function renderForm(name) {
    console.log(`This works: ${name}`);

    const newForm = `<form class="${name}" action="">
    <h3 id="stepHeading">${name}</h3>
    <div class="container">
        <input name="chinese" type="checkbox">
        <label for="chinese">Chinese</label>
        <input name="bbq" type="checkbox">
        <label for="bbq">BBQ</label>
        <input name="mexican" type="checkbox">
        <label for="mexican">Mexican</label>
    </div>
    <button class="button" id="${name}Btn" type="submit">Continue</button>
</form>`;
    return newForm;
}

function generatePriceForm() {
    const container1 = document.getElementById("stepContainer");

    const nameP = "Price";
    // renderForm(nameP);

    container1.innerHTML = renderForm(nameP);
}

function generateDiningForm() {
    const container1 = document.getElementById("stepContainer");

    const nameD = "Dining";

    container1.innerHTML = renderForm(nameD);
}


export {
    generateCuisineForm,
    generatePriceForm,
    generateDiningForm
};