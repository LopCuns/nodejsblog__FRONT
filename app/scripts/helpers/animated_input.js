import j from './lib.js'
import animatedInputHandler from '../events/animated_input.handler.js'
const start = () => {
  j.setAllEv(j.getAllQuery(document.body, '.userForm__input'), 'input', animatedInputHandler)
}
start()
