import j from './helpers/lib.js'
import registerFormHandler from './events/registerForm.handler.js'

const start = async () => {
  j.ev(window, 'DOMContentLoaded', async () => {
    j.ev(
      j.getFromShadow(j.id('registerForm'), 'form'),
      'submit',
      registerFormHandler
    )
  })
}
start()
