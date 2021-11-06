

facebook =()=>{
  window.location.href ="https://www.facebook.com/umdahkhanay"
}

whatsapp =()=>{
  window.location.href ="https://wa.me/923248241428"
}
instagram =()=>{
  window.location.href ="https://www.instagram.com/umdahkhana"
}
const body = document.querySelector("body");
    const navbar = document.querySelector(".navbarzz");
    const menuBtn = document.querySelector(".menu-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    menuBtn.onclick = ()=>{
      navbar.classList.add("show");
      menuBtn.classList.add("hide");
      body.classList.add("disabled");
    }
    cancelBtn.onclick = ()=>{
      body.classList.remove("disabled");
      navbar.classList.remove("show");
      menuBtn.classList.remove("hide");
    }
    window.onscroll = ()=>{
      this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
    }