import j from './helpers/lib.js'
import registerFormHandler from './events/register_form.handler.js'

const start = () => {
  j.ev(j.id('registerForm'), 'submit', registerFormHandler)
}
start()
