import j from './helpers/lib.js'
import loginFormHandler from './events/loginForm.handler.js'
const start = () => {
  j.ev(j.id('loginForm'), 'submit', loginFormHandler)
}
start()
