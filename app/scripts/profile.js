import { getUserProfile } from './server/requests/user.requests.js'
import j from './helpers/lib.js'
import updateUsernameHandler from './events/updateUsername.handler.js'
import updateEmailHandler from './events/updateEmail.handler.js'
import updatePasswordHandler from './events/updatePassword.handler.js'
const start = async () => {
  // Obtener los datos del usuario
  const userData = await getUserProfile()
  // Pintar los datos del usuario en pantalla
  j.setText(j.id('userId'), userData._id)
  j.setText(j.id('userRole'), userData.role)
  j.setText(j.id('userUsername'), userData.username)
  j.setText(j.id('userEmail'), userData.email)
  // Listener para abrir el formulario
  j.setAllEv(
    j.getAllQuery(document.body, '.userData__data__editBtn'),
    'click',
    (e) => {
      j.show(j.id(j.getAttrValue(e.currentTarget, 'data-form')))
    }
  )
  // Listener para enviar los formularios
  j.ev(
    j.getFromShadow(j.id('updateUsername'), 'form'),
    'submit',
    updateUsernameHandler
  )
  j.ev(
    j.getFromShadow(j.id('updateEmail'), 'form'),
    'submit',
    updateEmailHandler
  )
  j.ev(
    j.getFromShadow(j.id('updatePassword'), 'form'),
    'submit',
    updatePasswordHandler
  )
}
start()
