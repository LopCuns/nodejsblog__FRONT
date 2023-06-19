import generateError from '../components/error.component.js'
import { loginUser, getUserProfile } from '../helpers/requests/user.requests.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
const loginFormHandler = async (e) => {
  // Mostrar el loader
  showLoader()
  try {
    e.preventDefault()
    // Obtener el email y password
    const userData = new FormData(e.target)
    // Iniciar sesión
    const response = await loginUser({
      email: userData.get('email'),
      password: userData.get('password')
    })
    // Almacenar el JsonWebToken del usuario en el localStorage
    localStorage.setItem('jwt', await response.jwt)
    // Obtener los datos del usuario y almacenarlos en el localStorage
    const userModel = await getUserProfile()
    localStorage.setItem('userModel', JSON.stringify(userModel))
    // Resetear el formulario
    e.target.reset()
    // Redireccionar a la página principal
    window.location = '/index.html'
  } catch (err) {
    return generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    // Ocultar el loader
    hideLoader()
  }
}
export default loginFormHandler
