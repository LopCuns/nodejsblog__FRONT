import generateError from './components/error.component.js'
import generatePostSampleElement from './components/post_sample.component.js'
import { hideLoader, showLoader } from './helpers/loader.js'
import { getUserProfile } from './server/requests/user.requests.js'
const start = async () => {
  try {
    showLoader()
    // Obtener los posts publicados por el usuario
    const userProfile = await getUserProfile()
    const ownPosts = userProfile.posts
    // Generar un post sample por cada post publicado por el usuario
    for (const post of ownPosts) {
      await generatePostSampleElement({
        author: userProfile.username,
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
