import generateError from '../components/error.component.js'
import { loginUser } from '../helpers/requests.js'
import j from '../helpers/lib.js'
const loginFormHandler = async (e) => {
  // Mostrar el loader
  j.showLoader()
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
    j.hideLoader()
  }
}
export default loginFormHandler
