import { dislikePost, likePost } from '../server/requests/post.requests.js'
import { getUserProfile } from '../server/requests/user.requests.js'
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
      // Si el usuario ya le ha dado like al post, entonces retirarlo
      const likedPosts = (await getUserProfile()).likedPosts
      if (likedPosts.indexOf(postId) !== -1) {
        // Mostrar el icono de like y ocultar el de dislike
        j.removeClass(j.id('likeIcon'), 'hidden')
        j.addClass(j.id('dislikeIcon'), 'hidden')
        // Quitar el like al post
        await dislikePost(postId)
        // Reducir en 1 el valor de likes
        return j.attr(
          likeBtn,
          'data-likeCount',
          Number(j.getAttrValue(likeBtn, 'data-likeCount')) - 1
        )
      }
      // Dar like al post
      await likePost(postId)
      // Incrementar en 1 el número de likes del post
      j.attr(
        likeBtn,
        'data-likeCount',
        Number(j.getAttrValue(likeBtn, 'data-likeCount')) + 1
      )
      // Mostrar el icono de dislike y ocultar el de like
      j.removeClass(j.id('dislikeIcon'), 'hidden')
      j.addClass(j.id('likeIcon'), 'hidden')
    } catch (err) {
      // Generar un error
      return generateError({ message: err.message, parent: document.body })
    } finally {
      // Ocultar el loader
      hideLoader()
    }
  }
}
export default likeHandler
