import { commentPost } from '../helpers/requests/post.requests.js'
import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'

const commentFormHandler = (postId) => {
  return async (e) => {
    e.preventDefault()
    // Mostrar el loader
    showLoader()
    try {
      // Obtener el contenido del comentario
      const commentContent = new FormData(e.target).get('commentContent')
      // Si el comentario está vacío, ignorar
      if (!commentContent) return
      // Comentar en el post
      await commentPost(postId, commentContent)
      // Resetear el formulario
      e.target.reset()
    } catch (err) {
      // Generar un error
      generateError({ message: err.message, parent: document.body })
    } finally {
      // Ocultar el loader
      hideLoader()
    }
  }
}
export default commentFormHandler
