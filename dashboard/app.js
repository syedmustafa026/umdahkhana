let email = document.getElementById("email");
username = document.getElementById("name");
loader = document.getElementById("loader");
restaurant = document.getElementById("restname");
category = document.getElementById("productname");
food = document.getElementById("food");
price = document.getElementById("price");
pic = document.getElementById("profile");
loader = document.getElementById("loader")
cards = document.getElementById("allcards")
function myFunction() {
    swal("Welcome to User Portal")
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        firebase.database().ref(`users/${uid}`).on('value', (data) => {
            console.log(data.val())
            username.innerHTML = data.val().username
            email.innerHTML = data.val().email
            city.innerHTML = data.val().city
        })

    }
    else {
        window.location = "../formpage/public/loginuser.html"
    }
});
let submit = async () => {

    swal("Wait a While")
    let image = await upload(pic.files[0])
    firebase.database().ref('product').push({
        restaurant: restaurant.value,
        category: category.value,
        food: food.value,
        price: price.value,
        profile: image
    })
    firebase.database().ref('product').on('child_added', data => {
        restr = document.getElementById("restraunt")
        restr.innerHTML = data.val().restaurant
    })
    firebase.database().ref('product').on('child_added', data => {
        cards.innerHTML += `
            
            <div class="card" style="width: 20rem;">
                <img src="${data.val()[key].image}" class="card-img-top" alt="...">
                <div class="card-body"><span class="card-text">RS:${data.val()[key].price}</span>
                    <h3 class="card-title">${data.val()[key].food}</h3>
                    <p class="card-text">${data.val()[key].category} </p>    
                    <div class="butns">
                    <a onclick="edit('${data.val().key}')" class="btn btn-primary"></i>Edit</a>
                        <a onclick="dlt('${data.val().key}')"  class="btn btn-primary"></i>Delete</a>
                    </div>
                </div>
            </div>
            
         `
    })
}
let upload = async (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
        let progress1 = document.getElementById("progress");
        let bar = document.getElementById("bar");
        progress1.style.display = "block"
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                bar.style.width = Math.round(progress.toFixed()) + "%";
                bar.innerHTML = Math.round(progress.toFixed()) + "%";
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;

                }
                if (bar.innerHTML === "100%") {
                    swal("Successfully", " Item Added", "success");
                }

            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}




function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem("UserID")
            window.location = "../formpage/public/loginuser.html"
        })
}