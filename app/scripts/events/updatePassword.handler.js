import { showLoader, hideLoader } from '../helpers/loader.js'
import { updatePassword } from '../server/requests/user.requests.js'
import j from '../helpers/lib.js'
import generateError from '../components/error.component.js'

const updatePasswordHandler = async (e) => {
  try {
    showLoader()
    // Evitar el envío por defecto del formulario
    e.preventDefault()
    // Obtener los datos del formulario
    const form = e.target
    const formData = new FormData(form)
    // Actualizar la contraseña en la db
    await updatePassword({
      oldPassword: formData.get('oldPassword'),
      newPassword: formData.get('newPassword')
    })
    // Cerrar el formulario
    j.hide(j.id('updatePassword'))
    // Resetear el formulario
    form.reset()
  } catch (err) {
    // Generar un error
    generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    hideLoader()
  }
}

export default updatePasswordHandler
