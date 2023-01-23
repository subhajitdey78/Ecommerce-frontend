const productDetails = getElement("productDetails");
const addToCartBtn = getElement('addToCartBtn');
const goToCartBtn = getElement('goToCartBtn');
function loadProductDetails() {   
     const productId = window.location.serach.split('=')[1]
            fetch(BASE_URL + `/products/${productId}`,{
                method: 'GET', //or 'PUT'
                headers: {
                    'Content-Type' : "application/json",
                },
            })
        .then((response) => response.json())
        .then((data) =>{
            renderProdctDetails(data)
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }
    function renderProdctDetails(data) {
        console.log(data);
        const productListHtml =  `<div class="product-name>${data.name} </div>
        <div class="product-price fw-bold">&#8377${data.cost} </div>
        <div class="product-description">
        <div class="product-description-title fw-bold">Description </div>
        <div class="product-description-data ">${data.description} </div>

        </div>
        
        `;

        productDetails.innerHTML = productListHtml;
    }

    function addToCartFn() {
        const productId = window.location.serach.split('=')[1]
      const cartId = localStorage.getItem('cartId')
      const token = localStorage.get('token')

      const headers = {
        'Content-Type' : 'application/json',
        'Authrization': `Bearer ${token}`
      };
      const data = {'productIds': [productId],
      }; 

      fetch(BASE_URL + `/carts/${cartId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data) {
            goToCartBtn.classList.remove('d-none')
            addToCartBtn.classList.add("d-none")
        }
      }).catch((error) => console.log(error));

    }

    addToCartBtn.addEventListener('click', addToCartFn)
     
loadProductDetails();