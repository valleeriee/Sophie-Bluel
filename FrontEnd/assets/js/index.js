// chargement de la homepage logged ou non logged
const indexBody = document.querySelector("body")

window.onload = (event) => {
    const connection = localStorage.getItem("Token");
  
    if (connection === null) return

    indexBody.classList.add("logged")
};

function ajoutListenerLogout() {
    const lkLogout = document.getElementById("logOut");
    
    lkLogout.addEventListener("click", function (event) {
        event.preventDefault()
  
        localStorage.removeItem("Token");
        
        indexBody.classList.remove("logged")
    });
}

ajoutListenerLogout()
