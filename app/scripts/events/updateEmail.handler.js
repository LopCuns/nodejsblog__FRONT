import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
import { updateEmail } from '../server/requests/user.requests.js'
import j from '../helpers/lib.js'
const updateEmailHandler = async (e) => {
  try {
    showLoader()
    // Evitar el envío del formulario por defecto
    e.preventDefault()
    // Obtener los datos del formulario
    const form = e.target
    const formData = new FormData(form)
    // Modificar el email en la db
    await updateEmail({
      newEmail: formData.get('newEmail'),
      password: formData.get('password')
    })
    // Cerrar el formulario
    j.hide(j.id('updateEmail'))
    // Modificar los datos en la pantalla
    j.setText(j.id('userEmail'), formData.get('newEmail'))
    // Resetear el formulario
    form.reset()
  } catch (err) {
    // Generar un error
    generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    // Ocultar el loader
    hideLoader()
  }
}
export default updateEmailHandler
