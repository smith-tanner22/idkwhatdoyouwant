import {
    generateCuisineForm,
    setLocalStorage,
    generatePriceForm,
    generateDiningForm,
    getResults,
    loadHeaderFooter
} from "./utils.js";
loadHeaderFooter();
console.log("hhelo Admin")

function AddIdDelete(value) {

    fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/' + value, {
        method: 'DELETE',
    }).then(() => {

        let restrauntToRemove = document.querySelector(`.value${value}`)
        restrauntToRemove.remove();
    })
}



function AddIdEdit(value) {

    const data = {
        restaurantName: "Smith Restaurant",
        cuisine: "62b9f1ba647a293727fb4f98",
        description: "A brief description about the restaurant",
        address: "274 S 2nd W, Rexburg, ID 83440",
        zipCode: "54321",
        opens: "10am",
        closes: "10pm",
        phoneNumber: "208-356-9005",
        restaurantWebsite: "example.com",
        imgUrl: "../pic.jpg"
    };

    fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/' + value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(() => {
        console.log('success');
    })
}

function renderAResturant(resturant) {
    let ele = document.querySelector(".All_Resturant")
    var div = document.createElement('div')
    div.classList.add(`value${resturant._id}`)
    var btn1 = document.createElement('button')
    var heaed = document.createElement('h1')
    heaed.innerHTML = resturant.restaurantName
    btn1.innerHTML = "Delete"
    btn1.setAttribute("id", resturant._id + "delete")
    var btn2 = document.createElement('button')
    btn2.innerHTML = "Edit"
    btn2.setAttribute("id", resturant._id + "edit")
    div.appendChild(heaed)
    div.appendChild(btn1)
    div.appendChild(btn2)
    ele.appendChild(div)


    return ele




}

function renderAllResturant() {
    const BaseURL = 'https://cse341-restaurant-picker.herokuapp.com/';
    fetch(`${BaseURL}restaurants`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const formData = json.map(entry => {
                const value = renderAResturant(entry)
                var btn = document.getElementById(`${entry._id}delete`)
                var btn2 = document.getElementById(`${entry._id}edit`)
                console.log(btn);
                console.log(btn2);
                btn.addEventListener("click", function () {

                    AddIdDelete(entry._id)
                });
                btn2.addEventListener("click", function () {

                    AddIdEdit(entry._id)
                });
                return value
            });
            // const ele = document.querySelector(".All_Resturant")

            // ele.innerHTML = formData.join(' ');
        })
        .then()
        .catch((error) => {
            console.log(error.message)
        })
}
renderAllResturant();