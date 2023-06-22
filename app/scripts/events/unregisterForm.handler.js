import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
import { userUnregister } from '../server/requests/user.requests.js'

const unregisterFormHandler = async (e) => {
  showLoader()
  try {
    // Evitar el envío por defecto del formulario
    e.preventDefault()
    // Obtener los datos del formulario
    const form = e.target
    const formData = new FormData(form)
    console.log(formData)
    // Enviar la petición a la db
    await userUnregister({
      email: formData.get('email'),
      password: formData.get('password')
    })
    // Eliminar el jwt del localStorage
    localStorage.removeItem('jwt')
    // Resetear el formulario
    form.reset()
    // Redirigir a la página principal
    window.location = '/index.html'
  } catch (err) {
    // Generar un error
    return generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    hideLoader()
  }
}
export default unregisterFormHandler
