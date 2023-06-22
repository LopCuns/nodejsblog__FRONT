import { registerUser } from '../server/requests/user.requests.js'
import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
const registerFormHandler = async (e) => {
  // Mostrar el loader
  showLoader()
  try {
    e.preventDefault()
    const form = e.target
    // Obtener el username,email y password
    const userData = new FormData(form)
    // Registrar el usuario ( necesario el await para que el catch no se ejecute antes que la request )
    await registerUser({
      username: userData.get('username'),
      email: userData.get('email'),
      password: userData.get('password')
    })
    // Resetear el formulario
    form.reset()
    // Redireccionar al login
    window.location = '/app/html/pages/login.html'
  } catch (err) {
    // Generar un error
    return generateError({ message: err.message, parent: document.body })
  } finally {
    // Ocultar el loader
    hideLoader()
  }
}
export default registerFormHandler
