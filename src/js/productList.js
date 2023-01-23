//selectors
const categoryList = getElement("categoryList")
const productList = getElement("productList")
const searchInput = getElement("searchInput")
const minPrice = getElement("minPrice")
const maxPrice = getElement("maxPrice")
const clear = getElement("clear");

//Event Listners

searchInput.addEventListener('keyup', searchProduct)
minPrice.addEventListener('change', searchProduct)
maxPrice.addEventListener('change', searchProduct)
clear.addEventListener('click', clearAllFilter)

//functions
function clearAllFilter() {
    window.location.reload
}
function searchProduct() {
    const data = {
        name: searchInput.value,
        minCost: minPrice.value,
        maxCost: maxPrice.value,
    };
    let URI =  '/products?'


    fetch(BASE_URL + URI + new URLSearchParams(data))
    .then(response => response.json())
    .then(data => {
        renderProducts(data)
    })
    
}

function loadProducts() {
    const data = {}
    if(window.location.serach){
        data.id = window.location.serach.split('=')[1]
    }

    let URI = "/products";
    if(data.id){
        URI = `/categories/${data.id}/products`
    }

    fetch(BASE_URL + URI )
    .then((response) => response.json())
    .then((data) =>{
       renderProducts(data); 
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}
function loadCategories() {
    fetch(BASE_URL + "/categories")
    .then((response) => response.json())
    .then((data) => {
        renderCategories(data);
    })
    .catch((error) => console.log("Error:", error));
}
function renderCategories(categories){
    console.log(categories)
    let categoryListHtml = "";

    for(i=0; i<categories.length; i++){
        categoryListHtml += 
        '<a class="d-flex text-decoration-none" href="productList.html?categoryId=" ' + 
        categories[i].id + 
        '">' +
        categories[i].name + 
        "</a>";
    }
    categoryList.innerHTML = categoryListHtml
}


function  renderProducts(){
    let productListHtml = "";
    for( i = 0; i < productList.length; i++){
        console.log(products[i].cost)
        productListHtml += 
        '<a class="product-item text-decoration-none d-inline-block" href="ProductDetails.html?productId =' + 
        products[i].id + 
        '">'
        + '<div  class="product-img">'+ 
        '<img src="data:image/jpeg;base64,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" alt="prduct image" >' + 
        "</div">
        + '<div class="product-name text-center">' 
        + products[i].name + 
        '</div>'
        + '<div class="product-price text-center">$#8377 ' + 
        products[i].cost + 
        "</div>"
        + "</a>";      
    } 
    productList.innerHTML = productListHtml; 
}
loadCategories();
loadProducts();

function getElement(id) {
    return document.getElementById(id);
} 