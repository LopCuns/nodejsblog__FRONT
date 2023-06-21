import { createPost } from '../server/requests/post.requests.js'
import generateError from '../components/error.component.js'
import uuid4 from '../helpers/uuid4.js'
import getCurrentDate from '../helpers/getCurrentDate.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
const postFormHandler = async (e) => {
  // Evitar que se cargue el formulario
  e.preventDefault()
  // Mostrar el loader
  showLoader()
  try {
    // Obtener los datos del formulario
    const formData = new FormData(e.target)
    // Crear un post
    await createPost({
      _id: uuid4(),
      title: formData.get('postTitle').trim(),
      content: formData.get('postContent').trim(),
      likes: 0,
      comments: [],
      date: getCurrentDate()
    })
    // Resetear el formulario
    e.target.reset()
    // Redirigir a la página principal
    window.location = '/index.html'
  } catch (err) {
    // Generar un error
    return generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    // Ocultar el formulario
    hideLoader()
  }
}
export default postFormHandler
