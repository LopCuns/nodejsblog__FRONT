import { dislikePost, likePost } from '../helpers/requests/post.requests.js'
import generateError from '../components/error.component.js'
import j from '../helpers/lib.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
const likeHandler = (postId) => {
  return async () => {
    // Mostrar el loader
    showLoader()
    // Botón de like
    const likeBtn = j.id('likeBtn')
    try {
      // Dar like al post
      await likePost(postId)
      // Incrementar en 1 el número de likes del post
      j.attr(
        likeBtn,
        'data-likeCount',
        Number(j.getAttrValue(likeBtn, 'data-likeCount')) + 1
      )
    } catch (err) {
      // Obtener el código de error
      const errCode = err.message.slice(0, 3)
      // Si el código es distinto de 409, generar un error
      if (errCode !== '409') {
        // Generar un error
        return generateError({ message: err.message, parent: document.body })
      }
      // Si el código es 409, entonces retirar el like del post
      await dislikePost(postId)
      // Reducir en 1 el valor de likes
      j.attr(
        likeBtn,
        'data-likeCount',
        Number(j.getAttrValue(likeBtn, 'data-likeCount')) - 1
      )
    } finally {
      // Ocultar el loader
      hideLoader()
    }
  }
}
export default likeHandler
