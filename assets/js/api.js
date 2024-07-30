// Récupération des catégories
async function fetchCategories() {
    const reponse = await fetch('http://localhost:5678/api/categories/')
    if (reponse.ok) {
      return await reponse.json();
    } else {
      return []
    }
}

// Récupération des travaux
async function fetchWorks() {
    const reponse = await fetch('http://localhost:5678/api/works/')
    if (reponse.ok) {
      return await reponse.json();
    } else {
      return []
    }
}

// Appel de la fonction fetch avec toutes les informations nécessaires
function postLogin() {
  
}
