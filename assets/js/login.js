// Compte de test pour Sophie Bluel
// email: sophie.bluel@test.tld
// password: S0phie 

const compteId = {
    email: "sophie.bluel@test.tld",
    password: "S0phie"
}

// Envoi des valeurs du formulaire
function ajoutListenerLogin() {
    const formulaireLogin = document.getElementById("formulaire-login");

    formulaireLogin.addEventListener("submit", function (event) {
        event.preventDefault()

        let isLogged = false

        // Création de l’objet login
        const loginId = {
            email: event.target.querySelector("[name=email-login]").value,
            password: event.target.querySelector("[name=pwd-login]").value
        }

        const chargeUtile = JSON.stringify(loginId);

        if ((loginId.email === compteId.email) && (loginId.password === compteId.password)) {
            isLogged = true
            window.location.href = "index.html"
            window.localStorage.setItem("Connection", isLogged);
            /*fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });*/
        } else {
            const erreur = document.createElement("p")
            erreur.innerText = "Erreur dans l’identifiant ou le mot de passe"
            erreur.classList.add("txt-error")
            formulaireLogin.after(erreur)
        }
    });
}

ajoutListenerLogin()
