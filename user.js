async function displayData() {
    try {
        let response = await fetch("http://localhost:5000/food")
        if (!response.ok) {
            throw new Error(response.statusText, "Failed to fetch the data")
        }
        let food = await response.json()
        let container = document.getElementById("container");
        food.forEach(food => {
            let item = document.createElement("div");
            item.innerHTML = `
            <p>${food.name}</p>
                <img src="${food.image}" width=100%>
                <p>${food.caption}</p>
                <p>Price : Rs ${food.price}</p>`

            container.appendChild(item)
        }
        )
    } catch (error) {
        alert(error)
    }
}
document.addEventListener("DOMContentLoaded", displayData)