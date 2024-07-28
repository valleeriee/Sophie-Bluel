// chargement de la homepage logged ou non logged
window.onload = (event) => {
    const connection = window.localStorage.getItem("Connection");
    console.log(connection)
  
    if (connection === null) {
      /* Code de récupération des pièces depuis l’API HTTP */
    } else {
      const indexBody = document.querySelector("body")
      indexBody.classList.add("logged")
    }
};

function ajoutListenerLogout() {
    const lkLogout = document.getElementById("logOut");
    
    lkLogout.addEventListener("click", function (event) {
        event.preventDefault()
  
        const connection = window.localStorage.removeItem("Connection");
        const indexBody = document.querySelector("body")
        indexBody.classList.remove("logged")
    });
}

ajoutListenerLogout()
