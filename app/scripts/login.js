import j from './helpers/lib.js'
import loginFormHandler from './events/loginForm.handler.js'
const start = () => {
  j.ev(window, 'DOMContentLoaded', () => {
    j.ev(j.getFromShadow(j.id('loginForm'), 'form'), 'submit', loginFormHandler)
  })
}
start()
