
// Variables and declarations
const inputs = document.querySelectorAll(".input");
var email = document.getElementById('email');
password = document.getElementById('password');
username = document.getElementById('username');
checkEmail = document.getElementById("checkemail");
checkPassword = document.getElementById("checkpassword");
loader = document.getElementById("loader")
eye = document.getElementById("eye")

// input feildWork
function focusInput() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function blurInput() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}
inputs.forEach(input => {
    input.addEventListener("focus", focusInput);
    input.addEventListener("blur", blurInput);
});
//    showPassword

showPassword = () => {
    if (checkPassword.type === "password") {
        checkPassword.type = "text"
        eye.style.color = "#6f6ac8"
    }
    else {
        checkPassword.type = "password"
        eye.style.color = "grey"
    }
}

let logins = document.getElementById("login")
logins.addEventListener("click", login, false)
function login(e) {
    e.preventDefault()
    var email = localStorage.getItem("name");
    var paswordSave = localStorage.getItem("password");

    if (checkEmail.value === email && checkPassword.value === paswordSave) {
        swal("Well!", "Successfully logged in!", "success")
        setTimeout(function () {    
            window.location.href = "../../dashboard/db-admin/index.html"
        }, 2000)


    }
    else {
        swal("oops!", "Incorrect Email or Password", "error")
        setTimeout(function () {
            textErr.style.display = "none"
        }, 2000)
    }
    firebase.auth().signInWithEmailAndPassword(checkEmail.value, checkPassword.value)

        .then((res) => {
            var user = res.user;
            console.log("user>>>", user)
            localStorage.setItem("UserID", res.user.uid)
        })
        .catch((error) => {
            var errorMessage = error.message;
            swal(errorMessage)

        });
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location = "../../dashboard/db-admin/index.html"
    }

})