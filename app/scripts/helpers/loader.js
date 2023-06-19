import j from './lib.js'
const loader = document.getElementById('loader')
const showLoader = () => j.addClass(loader, 'show')
const hideLoader = () => j.removeClass(loader, 'show')

export { showLoader, hideLoader }
