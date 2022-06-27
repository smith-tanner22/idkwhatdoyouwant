const container1 = document.getElementById("stepContainer");

function renderForm() {

    const newForm = `<form class="price_form" action="">
    <h3 id="stepHeading">Price</h3>
    <div class="container">
       
    </div>
    <button class="submit" type="submit">Continue</button>
</form>`;
    return newForm;
}

container1.innerHTML = renderForm();