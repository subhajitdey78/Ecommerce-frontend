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
    let categoryListHtml = 
    '<div class="category-item rounded-3 d-flex justify-content-center align-items-center" >' + 
    '<a class="text-decoration-none text-white" href="productList.html" > All products </a>'+
     "</div>"

    for (i = 0; i <categories.length; i++ ){
        categoryListHtml +=     
        '<div class="category-item rounded-3 d-flex justify-content-center align-items-center" >' +
        '<a class ="text-decoration-none text-white href="productList.html?categoryId=" ' +
            categories[i].id +
            '">' +
            categories[i].name +
            "</a>" +
            "</div>";
        }

   categoryList.innerHTML = categoryListHtml; 
}

loadCategories();