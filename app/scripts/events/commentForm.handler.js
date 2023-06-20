import {
  commentPost,
  modifyPostComment
} from '../helpers/requests/post.requests.js'
import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
import j from '../helpers/lib.js'
import generatePostComment from '../components/comment.component.js'
import { getUserProfile } from '../helpers/requests/user.requests.js'

const commentFormHandler = (postId) => {
  return async (e) => {
    e.preventDefault()
    // Mostrar el loader
    showLoader()
    // Obtener el contenido del comentario
    const commentContent = new FormData(e.target).get('commentContent')
    const commentByUser = j.getQuery(document.body, '[data-byuser]')
    try {
      // Si el comentario está vacío, ignorar
      if (!commentContent) return
      // Si el usuario ya ha comentado en este post, entonces modificar su contenido
      if (commentByUser) {
        await modifyPostComment(postId, commentContent)
        return j.setText(
          j.getQuery(commentByUser.shadowRoot, '.postComment__content'),
          commentContent
        )
      }
      // Comentar en el post
      await commentPost(postId, commentContent)
      // Añadir el comentario en el post
      await generatePostComment({
        author: (await getUserProfile()).username,
        content: commentContent,
        parent: j.id('postComments'),
        postId
      })
      // Cambiar el valor del botón de submit
      j.changeValue(j.id('commentSubmit'), 'Editar comentario')
    } catch (err) {
      // Generar un error
      return generateError({ message: err.message, parent: document.body })
    } finally {
      // Ocultar el loader
      hideLoader()
      // Resetear el formulario
      e.target.reset()
    }
  }
}
export default commentFormHandler
