import { getLatestPosts } from '../server/requests/post.requests.js'
import { getUsernameById } from '../server/requests/user.requests.js'
import generateError from '../components/error.component.js'
import generatePostSampleElement from '../components/post_sample.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'
const loadLatestPosts = async () => {
  // Mostrar el loader
  showLoader()
  try {
    // Obtener los posts más recientes
    const latestPosts = await getLatestPosts()
    // Por cada post crear un postSample
    latestPosts.forEach(async (post) => {
      // Obtener el username del autor del post por su _id
      const authorName = await getUsernameById(post.authorId)
      // generar un postSample a partir de los datos del post
      await generatePostSampleElement({
        author: authorName,
        title: post.title,
        likes: post.likes,
        comments: post.comments.length,
        date: post.date,
        parent: document.getElementById('postWrapper')
      })
    })
  } catch (err) {
    // Generar un error
    generateError({ message: err.message, parent: document.body })
  } finally {
    // Ocultar el loader
    hideLoader()
  }
}
export default loadLatestPosts
