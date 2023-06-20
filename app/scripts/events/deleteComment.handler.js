import { deletePostComment } from '../helpers/requests/post.requests.js'
import generateError from '../components/error.component.js'
import j from '../helpers/lib.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
const deleteCommentHandler = (postId) => {
  return async (e) => {
    showLoader()
    try {
      // Eliminar el comentario de la base de datos y de la página
      await deletePostComment(postId)
      j.getQuery(j.id('postComments'), '[data-byuser]').remove()
      // Cambiar el valor del botón de submit
      j.changeValue(j.id('commentSubmit'), 'Share it!')
    } catch (err) {
      generateError({ message: err.message, parent: document.body })
    } finally {
      hideLoader()
    }
  }
}

export default deleteCommentHandler
