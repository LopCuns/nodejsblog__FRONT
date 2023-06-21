import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
import { updateUsername } from '../server/requests/user.requests.js'
import j from '../helpers/lib.js'

const updateUsernameHandler = async (e) => {
  try {
    showLoader()
    // Evitar el envío por defecto del formulario
    e.preventDefault()
    // Obtener los datos del formulario y enviarlos a la db
    const form = e.target
    const formData = new FormData(form)
    await updateUsername({ newUsername: formData.get('newUsername') })
    // Cerrar el formulario
    j.hide(j.id('updateUsername'))
    // Modificar los datos en la pantalla
    j.setText(j.id('userUsername'), formData.get('newUsername'))
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
export default updateUsernameHandler
