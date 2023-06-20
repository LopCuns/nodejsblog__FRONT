import j from '../helpers/lib.js'
const animatedInputHandler = (e) => {
  // Obtener el input en el que se ha disparado el evento
  const input = e.target
  // Obtener el label del input
  const label = e.target.previousElementSibling
  // Comprobar si el input está vacío
  const isInputEmpty = input.value === ''
  // Si el input no está vacío, colocar el label sobre el input
  if (!isInputEmpty) j.addClass(label, 'noin')
  // Si el input está vacío,colocar el label sobre el elemento
  else label.classList.remove('noin')

  // Obtener el patrón del input
  const inputPattern = input.pattern
  // Si ya existe un error del input en la página, eliminarlo
  const inputErrorElement = j.getQuery(input.parentNode, '.inputError')
  if (inputErrorElement) inputErrorElement.remove()
  // Si el input no tiene patrón o el input está vacío, no hacer nada
  if (!inputPattern || isInputEmpty) return
  // Si el input no cumple con su patrón, devolver un error
  if (!new RegExp(inputPattern).exec(input.value)) {
    return input.after(j.inputError(input))
  }
}
export default animatedInputHandler
