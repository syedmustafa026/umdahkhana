
// Variables and declarations
const inputs = document.querySelectorAll(".input");
var email = document.getElementById('email');
password = document.getElementById('password');
username = document.getElementById('username');
checkEmail = document.getElementById("checkEmail");
username = document.getElementById('username')
checkPassword = document.getElementById("checkPassword");
loader = document.getElementById("loader")
eye = document.getElementById("eye")
textErr = document.getElementById("texterr")
congrat = document.getElementById("congrats")
city = document.getElementById("city")
phone = document.getElementById("phone")
restr = document.getElementById("restr")
city = document.getElementById("city")
phone = document.getElementById("phone")

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
    if (password.type === "password") {
        password.type = "text"
        eye.style.color = "#6f6ac8"
    }
    else {
        password.type = "password"
        eye.style.color = "grey"
    }
}
let sign = document.getElementById("signup")
sign.addEventListener("click", signup, false)
function signup(e) {
    e.preventDefault()
    var password_regex = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/
    var email_validator_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.value.match(email_validator_regex)) {
        swal("OOPS!", "Enter a valid email", "error")
    }
    else if (!password.value.match(password_regex)) {
        swal("OOPS!", "Min length atleast 8 characters & with at least a number!", "error")
    }
    else {

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((res) => {
                firebase.database().ref(`users/${res.user.uid}`).set({
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    city: city.value,
                    phone: phone.value

                })
                    .then(() => {
                        loader.style.display = "inline-block"
                        localStorage.setItem("UserID", res.user.uid)
                        localStorage.setItem("name", email.value);
                        localStorage.setItem("password", password.value);
                        swal("Well!", "Your account has been created!", "success");
                        setTimeout(function () {
                            loader.style.display = "none"
                            window.location.href = "loginuser.html"
                        }, 3000)
                    })

            })
            .catch((error) => {
                var errorMessage = error.message;
                swal(errorMessage)

            });

    }
}

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         window.location = "home.html"
//     }

// })