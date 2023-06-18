import { registerUser } from '../helpers/requests.js'
import generateError from '../components/error.component.js'
const registerFormHandler = async (e) => {
  try {
    e.preventDefault()
    // Obtener el username,email y password
    const userData = new FormData(e.target)
    // Registrar el usuario ( necesario el await para que el catch no se ejecute antes que la request )
    await registerUser({
      username: userData.get('username'),
      email: userData.get('email'),
      password: userData.get('password')
    })
    // Resetear el formulario
    e.target.reset()
  } catch (err) {
    // Generar un error
    return generateError({ message: err.message, parent: document.body })
  }
}
export default registerFormHandler
