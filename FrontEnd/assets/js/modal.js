// Affichage / fermeture de la modale
let modal

const btnClose = document.querySelector(".js-modal-close")
const stopClose = document.querySelector(".js-modal-stop")

const showGallery = document.getElementById("showGallery")
const showAddPhoto = document.getElementById("showAddPhoto")

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
    showGallery.style.display = "block"
    showAddPhoto.style.display = "none"
}

const closeModal = (event) => {
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "none")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
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
const token = window.localStorage.getItem("Token")

function deleteWork() {

    let listWorks = document.querySelectorAll(".work-modal")
    
    for (let work of listWorks) {
        work.addEventListener("click", async (event) => {
            let workId = event.currentTarget.dataset.id
            let workImgUrl = event.currentTarget.getElementsByTagName("img")[0]
            
            try {
                const confirm = window.confirm("Supprimer ?")
                if (confirm) {
                    await fetchDeleteWork(workId, token)
                    work.style.display = "none"

                    // rechargement de la galerie dans la page principale
                    displayWorks()
                    alert("L'élément a bien été supprimé")
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

// Ajouter un element
const formulairePhoto = document.querySelector(".formulaire-photo")

async function generateSelectCategory() {
    const categories = await fetchCategories()

    const selectWrapper = document.querySelector(".select-wrapper")
    let selectCateg = document.createElement("select")
    selectCateg.setAttribute("id", "categ-photo")
    selectCateg.setAttribute("name", "categ-photo")
    selectCateg.setAttribute("class", "input select")

    const firstSelect = document.createElement("option")
    firstSelect.setAttribute("data-id", 0)
    selectCateg.appendChild(firstSelect)

    for (let categ of categories) {
        let optionCateg = document.createElement("option")
        optionCateg.innerText = categ.name
        optionCateg.setAttribute("data-id", categ.id)
        selectCateg.appendChild(optionCateg)
    }

    selectWrapper.appendChild(selectCateg)
    addWork()
}

function addWork() {
    const photoWrapper = document.querySelector(".ajout-photo")

    let choosePhoto = document.querySelector("[name=choose-photo]")
    let titlePhoto = document.querySelector("[name=title-photo]")
    let selectCategPhoto = document.querySelector("[name=categ-photo]")
    const submitPhoto = document.getElementById("submitPhoto")

    const checkEnableSubmit = () => {
        if (
            choosePhoto.value && 
            titlePhoto.value && 
            (categPhoto != 0)
        ) {
            submitPhoto.removeAttribute("disabled")
        } else {
            submitPhoto.setAttribute("disabled", "disabled")
        }
    }

    let categPhoto = 0
    let newImageDiv = document.createElement("div")
    newImageDiv.classList.add("new-image")
    let newImageSrc = document.createElement("img")

    let validImg = false
    
    choosePhoto.addEventListener('change', () => {
        const file = choosePhoto.files[0]
        const fileType = file['type']
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
        if (!validImageTypes.includes(fileType)) {
            alert("Veuillez sélectionner une image")
            console.log("Pas une image")
            return
        }

        validImg = true
        let imgUrl = URL.createObjectURL(choosePhoto.files[0])
        newImageSrc.src = imgUrl
        newImageSrc.alt = ""
        newImageDiv.appendChild(newImageSrc)
        photoWrapper.appendChild(newImageDiv)
        checkEnableSubmit()
    })
    titlePhoto.addEventListener('change', (validImg) => {
        if (validImg) checkEnableSubmit()
    })
    selectCategPhoto.addEventListener('change', () => {
        categPhoto = selectCategPhoto.options[selectCategPhoto.selectedIndex].dataset.id
        if (validImg) checkEnableSubmit()
    })

    formulairePhoto.addEventListener("submit", async (event) => {
        event.preventDefault()

        let imgFile = choosePhoto.files[0]

        let formData = new FormData()
        formData.append('image', imgFile)
        formData.append('title', titlePhoto.value)
        formData.append('category', categPhoto)

        try {
            await fetchAddWork(token, formData)

            formulairePhoto.reset()
            newImageDiv.remove()
            checkEnableSubmit()

            displayWorks()
            displayWorksModal()
            closeModal(event)

        } catch (error) {
            console.error("Erreur :", error)
        }
        
    })
}

displayWorksModal()
navModal()
generateSelectCategory()
