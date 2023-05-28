// modal handle

//sign up
const openSignUp = document.querySelector('.js-sign-up')
const modalSignUp = document.querySelector('.js-modal-sign-up')
const modalExit = document.querySelector('.js-modal-close')
const modalContainer = document.querySelector('.js-modal-container')


// mo sign up modal
function openSignUpModal() {
    modalSignUp.classList.add('open')
}
openSignUp.addEventListener('click', openSignUpModal)

// dong sign up modal
function closeSignUp() {
    modalSignUp.classList.remove('open')
}
modalExit.addEventListener('click', closeSignUp)

//sign in
const openSignIn = document.querySelector('.js-sign-in')
const modalSignIn = document.querySelector('.js-modal-sign-in')
const closeModalSignIn = document.querySelector('.js-sign-in-close')

//mo sign in modal
function openSignInModal() {
    modalSignIn.classList.add('open')
}
openSignIn.addEventListener('click', openSignInModal)

// dong sign In modal
function closeSignIn() {
    modalSignIn.classList.remove('open')
}
closeModalSignIn.addEventListener('click', closeSignIn)

// ngung noi bot
function stopPrg(event) {
    event.stopPropagation()
}

modalContainer.addEventListener('click', stopPrg)

