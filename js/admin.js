import {
    generateCuisineForm,
    setLocalStorage,
    generatePriceForm,
    generateDiningForm,
    getResults,
    loadHeaderFooter
} from "./utils.js";
loadHeaderFooter();

function AddIdDelete(value) {

    fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/' + value, {
        method: 'DELETE',
    }).then(() => {

        let restrauntToRemove = document.querySelector(`.value${value}`)
        restrauntToRemove.remove();
    })
}


function renderEditForm(data) {
    console.log(data.restaurantName)
    document.querySelector(".EditForm").style.display = "block";
    const editDiv = document.querySelector(".EditForm")
    // editDiv.innerHTML= "hello Edit"
    var ele = `<form class="editForm">
    <input type="hidden" name= "_id" value="${data._id}">
    <input type="hidden" name="cuisine" value="${data.cuisine}">
    <label>Name of Restaurant</label>
    <input type="text" name="restaurantName" value="${data.restaurantName}">
    <label>Description</label>
    <input type="text" name="description" value="${data.description}">
    <label>Opening Hours</label>
    <input type="text" name="opens" value="${data.opens}">
    <label>Closing Hours</label>
    <input type="text" name="closes" value="${data.closes}">
    <label>Phone</label>
    <input type="text" name="phoneNumber" value="${data.phoneNumber}">
    <label>Website</label>
    <input type="text" name="restaurantWebsite" value="${data.restaurantWebsite}">
    <label>Logo</label>
    <input type="text" name="imgUrl" value="${data.imgUrl}">
    <label>Description</label>
    <input type="text" name="description" value="${data.description}">
    <label>Address</label>
    <input type="text" name="address" value="${data.address}">
    <label>Zip Code</label>
    <input type="text" name="zipCode" value="${data.zipCode}">
    <label>Cuisine Type</label>
    <select name="cuisineType">
    <option value="${data.cuisineType}">Fast Food</option>
    <option value="${data.cuisineType}">American</option>
    <option value="${data.cuisineType}">Italian</option>
    <option value="${data.cuisineType}">Mexican</option>
    <option value="${data.cuisineType}">Asian</option>
    <option value="${data.cuisineType}">BBQ</option>
    </select>
    <label>Price</label>
    <select name="price">
    <option value="${data.price}">$</option>
    <option value="${data.price}">$$</option>
    <option value="${data.price}">$$$</option>
    </select>
    
    <label>Dining Style</label>
    <select name="diningStyle">
    <option value="${data.diningStyle}">Dine-in</option>
    <option value="${data.diningStyle}">Drive-thru</option>
    <option value="${data.diningStyle}">Dine-in & Drive-thru</option>
    </select>
    <button id="editFormbtn">Submit Edit</button>
    </form>`;
    editDiv.innerHTML = ele;
}


function createNewResturant() {
    document.querySelector(".createNewRest").addEventListener('click', function () {
        console.log("hello")
        var ele = `<form class="createForm">
                    <input type="hidden" name="cuisine" value="62b9f1ba647a293727fb4f98">
                    <label>Name of Restaurant</label>
                    <input type="text" name="restaurantName" >
                    
                    <label>Description</label>
                    <input type="text" name="description" >

                    <label>Address</label>
                    <input type="text" name="address" >

                    <label>Zip Code</label>
                    <input type="text" name="zipCode" >

                    <label>Opening Hours</label>
                    <input type="text" name="opens" >
                    
                    <label>Closing Hours</label>
                    <input type="text" name="closes" >
                    
                    <label>Phone</label>
                    <input type="text" name="phoneNumber" >
                    
                    <label>Website</label>
                    <input type="text" name="restaurantWebsite" >

                    <label>Price</label>
    <select name="price">
    <option value="$">$</option>
    <option value="$$">$$</option>
    <option value="$$$">$$$</option>
    </select>

    <label>Cuisine Type</label>
    <select name="cuisineType">
    <option value="Fast Food">Fast Food</option>
    <option value="America">American</option>
    <option value="Italian">Italian</option>
    <option value="Mexican">Mexican</option>
    <option value="Asian">Asian</option>
<option value="BBQ">BBQ</option>
    </select>

                    <label>Logo</label>
                    <input type="text" name="imgUrl" >
                
                    <label>Dining Style</label>
    <select name="diningStyle">
    <option value="Dine-in">Dine-in</option>
    <option value="Drive-thru">Drive-thru</option>
    <option value="Dine-in & Drive-thru">Dine-in & Drive-thru</option>
    </select>
                    
                    <button id="editFormbtn">Register New Resturant</button>
                </form>`;
        document.querySelector(".newRest").innerHTML = ele;

        const createform = document.querySelector('.createForm');
        if (createform) {
            createform.addEventListener('submit', (e) => {
                e.preventDefault();
                // const editForm = document.querySelector('.editForm');
                console.log("Hit edit")


                let formData = new FormData(e.target);
                const converted = Object.fromEntries(formData.entries())
                console.log(converted)


                fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(converted),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        if (data.acknowledged) {
                            alert("Your Entry was created Successfully")
                            location.reload()
                        }

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });





                // fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/', {
                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(converted),
                // }).then((response) => {
                // console.log('success');
                // alert("Success Your Edit has been made")
                // location.reload()
                // }).catch(error=>alert("failed to Resgister"))


            })
        }


    })
}
createNewResturant()

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
    fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/' + value)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            renderEditForm(data)


            const editbtn = document.querySelector('.editForm');
            if (editbtn) {
                editbtn.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // const editForm = document.querySelector('.editForm');
                    console.log("Hit edit")



                    let formData = new FormData(e.target);
                    const converted = Object.fromEntries(formData.entries())

                    fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/' + value, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(converted),
                    }).then(() => {
                        console.log('success');
                        alert("Success Your Edit has been made")
                        location.reload()
                    })

                })
            }



        }).then((data) => {

        });

    // fetch('https://cse341-restaurant-picker.herokuapp.com/restaurants/' + value, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // }).then(() => {
    //     console.log('success');
    // })
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
    btn1.classList.add("deleteBtn")
    var btn2 = document.createElement('button')
    btn2.innerHTML = "Edit"
    btn2.setAttribute("id", resturant._id + "edit")
    btn2.classList.add("editBtn")
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