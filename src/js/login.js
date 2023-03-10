//variable
const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";
//selectors
const showSignupBtn =  getElement("showSignupBtn");
const showloginBtn =  getElement("showloginBtn");
const signupForm   =  getElement("signupForm");
const loginForm =  getElement("loginForm");
const signupBtn =  getElement("signupBtn");
const loginBtn =  getElement("loginBtn");
const loginUsername =  getElement("loginUsername");
const signupUsername = getElement("signupUsername");
const loginPassword = getElement("loginPassword");
const signupPassword = getElement("signupPassword");
const signupEmail = getElement("signupEmail");
const authErrMsg = getElement("authErrMsg");
const succErrMsg = getElement("succErrMsg");

//function

function showSignup() {
    signupForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
}
function showLogin() {
    signupForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
}
function createCart() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        'Authorozation': `Bearrer ${token} `,
        };
        fetch(BASE_URL + "/carts", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ userId }),
        })
        .then((response) => response.json())
        .then((data) =>{
            localStorage.setItem("cartId", data.id);
            window.location.href= "index.html";
        });
    }  

    function loginFn(){
        if(signupUsername.value == "") {
            updateAuthErrorMsg("Username should not be empty");
        } else if (signupPassword.value == "") {
            updateAuthErrorMsg("Password should not be empty ");
        } else {
            const data = {
                username: loginUsername.value,
                password: loginPassword.value,
            };
            fetch(BASE_URL + "/auth/signin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            .then((response)=> response.json())
            .then((data) => {
             if(data.accessToken) {     
                  localStorage.setItem("username", data.username);
                  localStorage.setItem("userId", data.id);
                  localStorage.setItem("token", data.accessToken);
                  localStorage.setItem("email", data.email);
                  createCart();
             } else {
                updateAuthErrorMsg(data.msg);
             }
        });
     }
  }
function signupFn() {
    if(signupUsername.value == "") {
        updateAuthErrorMsg("Username should not be empty");
    }else if (signupPassword.value == "") {
        updateAuthErrorMsg("Password should not be empty ");
    } else {
        const data = {
         userName: signupUsername.value,
         Password: signupPassword.value,
         email: signupEmail.value,
        };

        fetch(BASE_URL + "/auth/signup", {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
        })
        .then((response) => response.json())
          .then((data) => {
            updateSuccErrorMsg(data.message);
        })
        .catch((error) => {
            console.log("Error", error);
        });
    }  
}  
function updateAuthErrorMsg(msg) {
    authErrMsg.innerText = msg;
}
function updateSuccErrorMsg(msg) {
    succErrMsg.innerText = msg;
}     
    
function getElement(id) {
    return document.getElementById(id);
} 

if(localStorage.getItem("username")) {
    window.location.href = "index.html"
}
//event listener
showSignupBtn.addEventListener("click", showSignup);
showloginBtn.addEventListener("click", showLogin);
signupBtn.addEventListener("click", signupFn);
loginBtn.addEventListener("click", loginFn);