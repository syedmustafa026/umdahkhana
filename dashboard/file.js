//Code for Resturants

const onResturantSignup = () => {
    let ResturantName = document.getElementById('restr');
    let City = document.getElementById('city');
    let Country = document.getElementById('country');
    let resturantEmail = document.getElementById('email');
    let resturantPassword = document.getElementById('password');

    firebase.auth().createUserWithEmailAndPassword(resturantEmail.value, resturantPassword.value)
        .then((userCredential) => {
            // Signed in 
            var Ruid = userCredential.user.uid;
            let Resturant = {
                resturantEmail: resturantEmail.value,
                ResturantName: ResturantName.value,
                City: City.value,
                Country: Country.value
            }
            firebase.database().ref(`Resturants/${Ruid}`).set(Resturant)
                .then((userCredential) => {
                    alert('Resturant registered')
                    location.href = "resturantlogin.html"
                })
                .catch((error) => {
                    var message = document.getElementById('message');
                    message.innerHTML = error.message;
                })
            // ...
        })
        .catch((error) => {
            var message = document.getElementById('message');
            message.innerHTML = error.message;
            // ..
        });
}

const onResturantLogin = () => {
    let resturantEmail = document.getElementById('checkEmail');
    let resturantPassword = document.getElementById('checkPassword');

    firebase.auth().signInWithEmailAndPassword(resturantEmail.value, resturantPassword.value)
        .then((userCredential) => {
            // Signed in
            var Ruid = userCredential.user.uid;
            firebase.database().ref(`Resturants/${Ruid}`).on('value', (data) => {
                console.log(data.val());
                location.href = 'admindashboard.html';
            })
            // ...  
        })
        .catch((error) => {
            var message = document.getElementById('message');
            message.innerHTML = error.message;
        });
}
const onResturantLogout = () => {
    firebase.auth().signOut().then(() => {
        location.href = 'resturantlogin.html'
    }).catch((error) => {
        alert(error.message);
    });
}
const getResturant = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var Ruid = user.uid;
            firebase.database().ref(`Resturants/${Ruid}`).on('value', (data) => {

                let resturantData = data.val();
                let ResturantName = document.getElementById('ResturantName');
                let City = document.getElementById('City');
                let Country = document.getElementById('Country');
                let resturantEmail = document.getElementById('resturant-email');
                ResturantName.innerHTML = resturantData.ResturantName;
                City.innerHTML = resturantData.City;
                Country.innerHTML = resturantData.Country;
                resturantEmail.innerHTML = resturantData.resturantEmail;
            })
            firebase.database().ref(`Resturants/${Ruid}/Food_Items`).on('child_added', (data) => {
                var ul = document.getElementById('All_Itmes')
                var ItemData = data.val()
                console.log(ItemData);
                var itemCode = `<div class="card" style="width: 100%;">
            <img src="food image.png" class="card-img-top" alt="... ">
            <div class="card-body" style = "color : black">
              <h5 class="card-title">${ItemData.ItemName}</h5>
              <p class="card-text">Price: ${ItemData.Price}</p>
              <p class="card-text">Delivery type: ${ItemData.deliveryType}</p>
            </div>
          </div>`
                var li = document.createElement('li');
                li.style.listStyle = 'none'
                console.log(li);
                li.innerHTML = itemCode;
                ul.appendChild(li);
            })
        }
        else {
            // User is signed out
            // ...
            document.write('user is signed out');
        }
    });
}
const addFoods = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var Ruid = user.uid;
            let ItemName = document.getElementById('ItemName')
            let Price = document.getElementById('Price')
            let category = document.getElementById('category')
            let deliveryType = document.getElementById('deliveryType')
            var key = firebase.database().ref(`Resturants/${Ruid}/Food_Items`).push().key;
            let foodItems = {
                ItemName: ItemName.value,
                Price: Price.value,
                category: category.value,
                deliveryType: deliveryType.value
            }
            firebase.database().ref(`Resturants/${Ruid}/Food_Items/${key}`).set(foodItems)


        }
        else {
            // User is signed out
            // ...
            document.getElementsByTagName('body').innerHTML = 'user is signed out';
        }
    });

}

// code for user 

const onUserSignup = () => {
    let name = document.getElementById('name');
    let fname = document.getElementById('fname');
    let phoneno = document.getElementById('phoneno');
    let address = document.getElementById('address');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var uid = userCredential.user.uid;
            let Users = {
                name: name.value,
                fname: fname.value,
                phoneno: phoneno.value,
                address: address.value,
                email: email.value
            }
            firebase.database().ref(`Users/${uid}`).set(Users)
                .then((userCredential) => {
                    alert('User registered')
                    location.href = "userlogin.html"
                })
                .catch((error) => {
                    var message = document.getElementById('message');
                    message.innerHTML = error.message;
                })
            // ...
        })
        .catch((error) => {
            var message = document.getElementById('message');
            message.innerHTML = error.message;
            // ..
        });
}

const onUserLogin = () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            location.href = 'dashboard.html';

            // ...  
        })
        .catch((error) => {
            var message = document.getElementById('message');
            message.innerHTML = error.message;
        });
}

const getUserandMenu = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid
            firebase.database().ref(`Users/${uid}`).on('value', (data) => {
                let name = document.getElementById('name');
                let fname = document.getElementById('fname');
                let phoneno = document.getElementById('phoneno');
                let address = document.getElementById('address');
                let email = document.getElementById('email');
                name.innerHTML = `Name: ${data.val().name}`;
                fname.innerHTML = `Father's Name: ${data.val().fname}`;
                phoneno.innerHTML = `Phone no:${data.val().phoneno}`;
                address.innerHTML = `Address: ${data.val().address}`;
                email.innerHTML = `Email: ${data.val().email}`;
            })
            firebase.database().ref(`Resturants`).on('value', (data) => {
                console.log(data.val())
            });
        }
        else {
            document.write('user is signed out');
        }
    })
}