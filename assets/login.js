// Compte de test pour Sophie Bluel
// email: sophie.bluel@test.tld
// password: S0phie 

const compteId = {
    emailLogin: "sophie.bluel@test.tld",
    pwdLogin: "S0phie"
}

// Envoi des valeurs du formulaire
function ajoutListenerLogin() {
    const formulaireLogin = document.getElementById("formulaire-login");

    formulaireLogin.addEventListener("submit", function (event) {
        event.preventDefault()

        let isLogged = false

        // Création de l’objet login
        const loginId = {
            emailLogin: event.target.querySelector("[name=email-login]").value,
            pwdLogin: event.target.querySelector("[name=pwd-login]").value
        }

        if ((loginId.emailLogin === compteId.emailLogin) && (loginId.pwdLogin === compteId.pwdLogin)) {
            isLogged = true
            window.location.href = "index.html"
            window.localStorage.setItem("Connection", isLogged);
        } else {
            const erreur = document.createElement("p")
            erreur.innerText = "Erreur dans l’identifiant ou le mot de passe"
            erreur.classList.add("txt-error")
            formulaireLogin.after(erreur)
        }
    });
}

ajoutListenerLogin()
