const boton = document.querySelector('#botonmenu');
const menu = document.querySelector('#menu');
boton.addEventListener('click', () => {
console.log('me diste click')
menu.classList.toggle('hidden')
})