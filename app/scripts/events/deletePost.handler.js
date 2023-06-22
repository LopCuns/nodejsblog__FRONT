import generateError from '../components/error.component.js'
import { hideLoader, showLoader } from '../helpers/loader.js'
import { deletePost } from '../server/requests/post.requests.js'
const deletePostHandler = (postId) => {
  return async () => {
    try {
      showLoader()
      await deletePost(postId)
      window.location = '/index.html'
    } catch (err) {
      generateError({
        message: err.message,
        parent: document.body
      })
    } finally {
      hideLoader()
    }
  }
}
export default deletePostHandler
