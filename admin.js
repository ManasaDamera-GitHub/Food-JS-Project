
async function getData() {
    console.log("please wait .......")
    let response = await fetch("https://repeated-delightful-glass.glitch.me/FOOD%20JSON%20DATA/db.json")
    // console.log(response)
    try {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    } catch (error) {
        console.log(error)
    }
    let food = await response.json()
    // console.log(food)
    displayData(food)
}
function displayData(food) {
    // using container

    // console.log(food)
    //     let container = document.getElementById("grid-container");
    //     container.innerHTML = '';
    //     food.forEach(food => {
    //         console.log(food)
    //         let item = document.createElement("div")
    //         item.innerHTML = `
    //                 <p>${food.name}</p>
    //                 <img src="${food.image}" width=100%>
    //                 <p>${food.caption}</p>
    //                 <p> Price:Rs ${food.price}</p>
    //                 <button id = deleteBtn-${food.id}>Delete</button>
    //                 <button id = editBtn-${food.id}>Edit</button>`
    //         console.log(food)
    //         container.append(item)
    //         // console.log(item)
    //         // container1.append(item)
    //         let deleteButton = document.getElementById(`deleteBtn-${food.id}`)
    //         let editBtn = document.getElementById(`editBtn-${food.id}`)
    //         deleteButton.onclick = () => {
    //             deleteItem(food.id)
    //         }
    //         editBtn.onclick = () => {
    //             editData(food.id)
    //         }

    //     })
    // }



    // Get the container for the table
    let container = document.getElementById("grid-container");
    container.innerHTML = '';

    // Create a table
    let table = document.createElement("table");
    table.style.width = "100%";
    table.setAttribute("border", "1");

    // Create table header row
    let header = table.createTHead();
    let headerRow = header.insertRow(0);
    headerRow.innerHTML = `
        <th>Name</th>
        <th>Image</th>
        <th>Caption</th>
        <th>Price</th>
        <th>Actions</th>
    `;

    // Create table body
    let tbody = table.createTBody();

    food.forEach(foodItem => {
        let row = tbody.insertRow();

        // Create table cells for each food item
        row.innerHTML = `
            <td>${foodItem.name}</td>
            <td><img src="${foodItem.image}" width="100" alt="${foodItem.name}"></td>
            <td>${foodItem.caption}</td>
            <td>Rs${foodItem.price}</td>
            <td>
                <button class="deleteBtn">Delete</button>
                <button class="editBtn">Edit</button>
            </td>
        `;

        // Add event listeners for Delete and Edit buttons
        const deleteButton = row.querySelector(".deleteBtn");
        const editButton = row.querySelector(".editBtn");

        deleteButton.onclick = () => {
            deleteItem(foodItem.id);
        };
        editButton.onclick = () => {
            editData(foodItem.id);
        };
    });

    // Append the table to the container
    container.append(table);
}

async function deleteItem(id) {
    try {
        let response = await fetch(`https://repeated-delightful-glass.glitch.me/FOOD%20JSON%20DATA/db.json/${id}`, { method: "DELETE" })
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        alert("Data deleted successfully")
        getData()

    } catch (error) {
        alert("Something went wrong")
        console.log(error)
    }
}
async function editData(id) {
    let foodId = document.getElementById("id");
    let name = document.getElementById("name");
    let image = document.getElementById("image");
    let caption = document.getElementById("caption");
    let price = document.getElementById("price");
    let response = await fetch(`http://localhost:5000/food/${id}`);
    try {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        let food = await response.json();
        foodId.value = food.id;
        name.value = food.name;
        image.value = food.image;
        caption.value = food.caption;
        price.value = food.price;
    } catch (error) {
        console.log(error)
    }
}

async function saveData() {
    let foodId = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let caption = document.getElementById("caption").value;
    let price = document.getElementById("price").value;

    let obj = {
        "name": name,
        "image": image,
        "caption": caption,
        "price": price
    }

    let FoodMethod = foodId ? "PUT" : "POST";
    let URL = foodId ? `https://repeated-delightful-glass.glitch.me/FOOD%20JSON%20DATA/db.json/${foodId}` : `https://repeated-delightful-glass.glitch.me/FOOD%20JSON%20DATA/db.json`;

    let response = await fetch(URL, {
        "method": FoodMethod,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(obj)
    })
    try {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        alert("Data Updated Succesfully");
        getData();
    } catch (error) {
        console.error(error);
    }

}
document.addEventListener("DOMContentLoaded", getData); 
