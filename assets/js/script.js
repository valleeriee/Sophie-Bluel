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
  filtres.classList.add("filtres", "hide-logged")
  portfolio.insertBefore(filtres, gallery)

  for (let categ of categories) {
    let filtreBtn = document.createElement("button")

    filtreBtn.innerText = categ.name
    filtreBtn.dataset.id = categ.id

    filtreBtn.classList.add("filtre-btn")
    filtres.appendChild(filtreBtn)
  }

  displayButtonReset()

  const filtreClick = document.querySelectorAll(".filtre-btn")
  for (let filtre of filtreClick) {
    filtre.addEventListener("click", function() {
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

  for (let work of works) {
    let figure = document.createElement("figure")
    let image = document.createElement("img")
    image.src = work.imageUrl
    image.alt = work.title
    let figcaption = document.createElement("figcaption")
    figcaption.innerText = work.title

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
