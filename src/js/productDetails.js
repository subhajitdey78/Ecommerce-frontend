const productDetails = getElement("productDetails");
const addToCartBtn = getElement('addToCartBtn');
const goToCartBtn = getElement('goToCartBtn');

 
function loadProductDetails() {   
     const productId = window.location.serach.split('=')[1]
      console.log(productId, "productId");
            fetch(BASE_URL + `/products/${productId}` ,{
                method: 'GET',
                headers: {
                    'content-Type' : "application/json",
                },
            } )
        .then((response) => response.json())
        .then((data) =>{
           renderProducts(data); 
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    
    }

function renderProductDetails(data){
    console.log(data);
}

function getElement() {
    return document.getElementById(id)
}

loadProductDetails();