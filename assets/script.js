// Récupération des travaux depuis le fichier JSON
/*
const reponse = await fetch('http://localhost:5678/api/works/');
const works = await reponse.json();
// Transformation en JSON
const valeurWorks = JSON.stringify(works);
console.log(reponse)
console.log(works)
console.log(valeurWorks)
*/

const [worksResponse, categoriesResponse] = await Promise.all([
  fetch('http://localhost:5678/api/works/'),
  fetch('http://localhost:5678/api/categories/')
]);

const works = await worksResponse.json();
const categories = await categoriesResponse.json();

// Récupération des travaux depuis le back-end
const portfolio = document.getElementById("portfolio")
const gallery = document.querySelector(".gallery")

for (let i = 0; i < works.length; i++) {
  let figure = document.createElement("figure")
  let image = document.createElement("img")
  image.src = works[i].imageUrl
  image.alt = works[i].title
  let figcaption = document.createElement("figcaption")
  figcaption.innerText = works[i].title

  figure.appendChild(image)
  figure.appendChild(figcaption)
  gallery.appendChild(figure)
}

// Réalisation du filtre des travaux
let filtres = document.createElement("div")
filtres.classList.add("filtres")
portfolio.insertBefore(filtres, gallery)

for (let i = 0; i < categories.length+1; i++) {
  let filtreBtn = document.createElement("button")

  if (i === 0) {
    filtreBtn.innerText = "Tous"
  } else {
    filtreBtn.innerText = categories[i-1].name
  }

  filtreBtn.classList.add("filtre-btn")
  filtreBtn.dataset.id = i
  filtres.appendChild(filtreBtn)
}
