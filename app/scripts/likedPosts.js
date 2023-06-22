import generateError from './components/error.component.js'
import generatePostSampleElement from './components/post_sample.component.js'
import { hideLoader, showLoader } from './helpers/loader.js'
import { getLikedPosts } from './server/requests/post.requests.js'
import { getUsernameById } from './server/requests/user.requests.js'
const start = async () => {
  try {
    showLoader()
    // Obtener los posts guardados
    const likedPosts = await getLikedPosts()
    // Generar un post sample para cada post
    for (const post of likedPosts) {
      const postAuthor = await getUsernameById(post.authorId)
      await generatePostSampleElement({
        author: postAuthor,
        title: post.title,
        likes: post.likes,
        comments: post.comments.length,
        date: post.date,
        parent: document.getElementById('postsWrapper')
      })
    }
  } catch (err) {
    // Generar un error
    generateError({
      err: err.message,
      parent: document.body
    })
  } finally {
    hideLoader()
  }
}
start()
