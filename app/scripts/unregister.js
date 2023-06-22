import j from './helpers/lib.js'
import unregisterFormHandler from './events/unregisterForm.handler.js'
const start = () => {
  j.ev(j.getFromShadow(j.id('unregisterForm'), ' form'), 'submit', unregisterFormHandler)
}
start()
