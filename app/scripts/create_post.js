import j from './helpers/lib.js'
import postFormHandler from './events/postForm.handler.js'
const start = () => {
  j.ev(j.id('postForm'), 'submit', postFormHandler)
}
start()
