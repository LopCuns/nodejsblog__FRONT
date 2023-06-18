import generateError from '../components/error.component.js'
import { loginUser } from '../helpers/requests.js'
const loginFormHandler = async (e) => {
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
  } catch (err) {
    return generateError({
      message: err.message,
      parent: document.body
    })
  }
}
export default loginFormHandler
