import j from '../helpers/lib.js'
import generatePostSampleElement from '../components/post_sample.component.js'
import generateError from '../components/error.component.js'
import { showLoader, hideLoader } from '../helpers/loader.js'

import {
  getPostById,
  getPostByTitleAuthor
} from '../helpers/requests/post.requests.js'
import { getUsernameById } from '../helpers/requests/user.requests.js'
const searchPostHandler = async (e) => {
  // Mostrar el loader
  showLoader()
  try {
    // Evitar el envio del formulario
    e.preventDefault()
    // Obtener el campo que contiene el valor de busqueda
    const searchInput = j.id('searchInput')
    // Obtener el valor de busqueda
    const searchValue = searchInput.value
    // Si el valor de busqueda es un uuid4
    if (j.isUuid4(searchValue)) {
      // Obtener post por su _id
      const post = await getPostById(searchValue)
      // Obtener el username del autor del post por su _id
      const authorUsername = await getUsernameById(post.authorId)
      // Resetear el searchInput
      j.resetField(searchInput)
      // Generar un post_sample con los datos del post y del autor
      return generatePostSampleElement({
        author: authorUsername,
        title: post.title,
        likes: post.likes,
        comments: post.comments.length,
        date: post.date,
        parent: j.id('postWrapper')
      })
    }
    if (j.isTitleByAuthor(searchValue)) {
      // Obtener el title y el author del post del search value
      const title = searchValue.split('by')[0].trim()
      const author = searchValue.split('by')[1].trim()
      // Obtener el post por su title y su author
      const post = await getPostByTitleAuthor(title, author)
      // Resetear el campo de busqueda
      j.resetField(searchInput)
      // Generar un post_sample con los datos del post y del autor
      return generatePostSampleElement({
        author,
        title: post.title,
        likes: post.likes,
        comments: post.comments.length,
        date: post.date,
        parent: j.id('postWrapper')
      })
    }
  } catch (err) {
    // Generar un nuevo error
    return generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    // Ocultar el loader
    hideLoader()
  }
}

export default searchPostHandler
