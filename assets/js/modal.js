// Affichage / fermeture de la modale
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
  
    for (let work of works) {
      let div = document.createElement("div")
      div.setAttribute("data-id", work.id)
      div.classList.add("work-modal")
      let image = document.createElement("img")
      image.src = work.imageUrl
      image.alt = work.title
  
      div.innerHTML = htmlDelete
      div.appendChild(image)
      galleryModal.appendChild(div)
    }

    deleteWork()
}

// Supprimer un element
function deleteWork() {

    let listWorks = document.querySelectorAll(".work-modal")
    const token = window.localStorage.getItem("Token")
    
    for (let work of listWorks) {
        work.addEventListener("click", async (event) => {
            let workId = event.currentTarget.dataset.id

            try {
                const confirm = window.confirm("Supprimer ?")
                if (confirm) {
                    const response = await fetch(`http://localhost:5678/api/works/${workId}/`, {
                        method: "DELETE",
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                    if (!response.ok) {
                        throw new Error("Suppression échec")
                    }
                    console.log('Suppression ok')
                    work.style.display = "none"
                    displayWorks()
                }
            } catch (error) {
                console.error("La suppression a échoué :", error)
            }
        })
    }
}

// Navigation entre les 2 écrans de la modale
function navModal() {
    const btnNext = document.getElementById("js-next")
    const btnBack = document.getElementById("js-back")

    const btnModal = document.querySelectorAll(".nav-modal")
    const showGallery = document.getElementById("showGallery")
    const showAddPhoto = document.getElementById("showAddPhoto")

    for (let btn of btnModal) {
        btn.addEventListener("click", () => {
            let btnId = btn.id

            switch(btnId) {
                case 'js-next':
                    showGallery.style.display = "none"
                    showAddPhoto.style.display = "block"
                    break
            
                case 'js-back':
                    showGallery.style.display = "block"
                    showAddPhoto.style.display = "none"
                    break
            }
        })
    }
}

displayWorksModal()
navModal()
