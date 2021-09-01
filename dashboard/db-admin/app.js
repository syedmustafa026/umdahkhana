let email = document.getElementById("email");
username = document.getElementById("name");
loader = document.getElementById("loader");
restaurant = document.getElementById("restname");
category = document.getElementById("productname");
food = document.getElementById("food");
price = document.getElementById("price");
pic = document.getElementById("profile");
loader = document.getElementById("loader")
function myFunction(){
    swal("Welcome to Admin Portal")
}

function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem("UserID")
            window.location = "../../formpage/public/loginadmin.html"
        })
}

