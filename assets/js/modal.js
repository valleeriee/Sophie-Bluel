let modal = null
// let modal = null ou let modal = "" ??

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
    console.log(modal)
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
