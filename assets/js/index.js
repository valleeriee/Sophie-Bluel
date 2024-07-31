// chargement de la homepage logged ou non logged
const indexBody = document.querySelector("body")

window.onload = (event) => {
    const connection = window.localStorage.getItem("Token");
  
    if (connection === null) return

    indexBody.classList.add("logged")
};

function ajoutListenerLogout() {
    const lkLogout = document.getElementById("logOut");
    
    lkLogout.addEventListener("click", function (event) {
        event.preventDefault()
  
        const connection = window.localStorage.removeItem("Token");
        
        indexBody.classList.remove("logged")
    });
}

ajoutListenerLogout()
