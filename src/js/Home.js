// const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1"

const categoryList = document.getElementById("categoryList");

function loadCategories() {
    fetch(BASE_URL + "/categories")
    .then((response) => response.json())
    .then((data) => {
        renderCategories(data);
    })
    .catch((error) => console.log("Error:", error));
}

function renderCategories(categories) {
    console.log(categories);
}

loadCategories();