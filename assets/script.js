const gallery = document.querySelector(".gallery")
let works = []

// Affichage du bouton 'Tous' 
function displayButtonReset() {
  const filtres = document.querySelector(".filtres")
  let filtreAll = document.createElement("button")
  filtreAll.innerText = "Tous"
  filtreAll.classList.add("filtre-btn", "filtre-on")
  filtres.prepend(filtreAll)
}

// Affichage des filtres
async function displayCategoriesButtons() {
  const categories = await fetchCategories()

  // Utilisation de l'objet Set ? const categoriesSet = new Set(categories);
  
  const portfolio = document.getElementById("portfolio")
  
  let filtres = document.createElement("div")
  filtres.classList.add("filtres")
  portfolio.insertBefore(filtres, gallery)

  for (let i = 0; i < categories.length; i++) {
    let filtreBtn = document.createElement("button")

    filtreBtn.innerText = categories[i].name
    filtreBtn.dataset.id = categories[i].id

    filtreBtn.classList.add("filtre-btn")
    filtres.appendChild(filtreBtn)
  }

  displayButtonReset()

  const filtreClick = document.querySelectorAll(".filtre-btn")
  for (let i = 0; i < filtreClick.length; i++) {
    filtreClick[i].addEventListener("click", function() {
      sortWorks(this);
    });
  }
}

// Affichage des travaux
async function displayWorks(works) {
  if (!works) {
    works = await fetchWorks()
  }
  gallery.innerHTML = "";

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
}

// Tri des travaux 
async function sortWorks(btnClicked) {
  works = await fetchWorks()

  let btnActive = document.querySelector(".filtre-on")
  btnActive.classList.remove("filtre-on")
  btnClicked.classList.add("filtre-on")

  let clickId = Number(btnClicked.dataset.id)

  const worksFiltres = works.filter(function (work) {
    if (!clickId) {
      return work
    } else {
      return work.categoryId === clickId
    }
    
  });

  displayWorks(worksFiltres)
}

displayCategoriesButtons()
displayWorks()
