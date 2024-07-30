// Affichage de la modale
let modal = null // let modal = null ou let modal = "" ??

const btnClose = document.querySelector(".js-modal-close")
const stopClose = document.querySelector(".js-modal-stop")

const openModal = (event) => {
    event.preventDefault()
    const getUrl = event.target.getAttribute("href")
    const target = document.querySelector(getUrl)
    target.removeAttribute("style")
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal)
    btnClose.addEventListener("click", closeModal)
    stopClose.addEventListener("click", (event) => event.stopPropagation())
}

const closeModal = (event) => {
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "none")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal) // pourquoi removeEventListener ?
    btnClose.removeEventListener("click", closeModal)
    stopClose.removeEventListener("click", (event) => event.stopPropagation())
    modal = null
}

document.querySelectorAll(".js-modal").forEach(lk => {
    lk.addEventListener("click", openModal)
})

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
})


// Affichage des travaux
const galleryModal = document.querySelector(".gallery-modal")
let worksModal = []

async function displayWorksModal(works) {
    if (!works) {
      works = await fetchWorks()
    }
    galleryModal.innerHTML = ""
    const htmlDelete = `<span class="delete"><i class="fa-solid fa-trash-can"></i></span>`
  
    for (let i = 0; i < works.length; i++) {
      let div = document.createElement("div")
      div.classList.add("work-modal")
      let image = document.createElement("img")
      image.src = works[i].imageUrl
      image.alt = works[i].title
  
      div.innerHTML = htmlDelete
      div.appendChild(image)
      galleryModal.appendChild(div)
    }

    deleteWork()
}

// Supprimer un element
function deleteWork() {

    let listWorks = document.querySelectorAll(".work-modal")
    
    for (let i = 0; i < listWorks.length; i++) {
        listWorks[i].addEventListener("click", async (event) => {
            let response = await fetch("http://localhost:5678/api/works/" + i, {
                method: "DELETE",
            });
            let result = await response.json();
            console.log(result)
        })
    }
}

displayWorksModal()
