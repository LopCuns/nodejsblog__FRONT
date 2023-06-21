import j from './lib.js'
import animatedInputHandler from '../events/animated_input.handler.js'
// IMPRESCINDIBLE EL ARCHIVO userForm.css PARA EL FUNCIONAMIENTO DE ESTE ARCHIVO
const start = () => {
  j.setAllEv(
    j.getAllQuery(document.body, '.userForm__input'),
    'input',
    animatedInputHandler
  )
}
start()
