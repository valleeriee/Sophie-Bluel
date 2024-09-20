// Récupération des catégories
async function fetchCategories() {
    try {
      const reponse = await fetch('http://localhost:5678/api/categories/')
      return await reponse.json()
    } catch {
      console.log('Erreur au chargement des catégories')
    }
}

// Récupération des travaux
async function fetchWorks() {
    try {
      const reponse = await fetch('http://localhost:5678/api/works/')
      return await reponse.json()
    } catch {
      console.log('Erreur au chargement de la galerie')
    }
}

// Suppression de travaux
async function fetchDeleteWork(workId, token) {
  const response = await fetch(`http://localhost:5678/api/works/${workId}/`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${token}`}
  })

  if (!response.ok) {
    alert("La suppression a échoué")
    throw new Error("La suppression a échoué")
  }
  console.log('Suppression ok')
  return
}

// Ajout de travaux
async function fetchAddWork(token, formData) {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  
  if (!response.ok) {
      alert("L'ajout a échoué")
      throw new Error("L'ajout a échoué")
  }
  const result = await response.json()
  console.log("Ajout ok")
}
