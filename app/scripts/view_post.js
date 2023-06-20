import j from './helpers/lib.js'
import { showLoader, hideLoader } from './helpers/loader.js'
import { getPostByTitleAuthor } from './helpers/requests/post.requests.js'
import { getUsernameById } from './helpers/requests/user.requests.js'
import commentFormHandler from './events/commentForm.handler.js'
import likeHandler from './events/like.handler.js'
import generateError from './components/error.component.js'
import generatePostComment from './components/comment.component.js'
const start = async () => {
  // Mostrar el loader
  showLoader()
  try {
    // Obtener el title y el author del post de los params de location
    const { title, author } = j.getQueryParameters(location.href)
    // Obtener el post a partir de su title y su author
    const post = await getPostByTitleAuthor(title, author)
    // Cambiar el valor de la visibilidad de la página a visible
    j.changeCssVar('--postVisibility', 'visible')
    // Incluir el titulo del post en la página
    j.setText(j.id('postTitle'), title.replaceAll('%20', ' '))
    // Incluir el autor del post en la página
    j.setText(j.id('postAuthor'), `by ${author}`)
    // Incluir la fecha del post en la página
    j.setText(j.id('postDate'), post.date)
    // Incluir el contenido del post en la página
    j.setText(j.id('postContent'), post.content)
    // Incluir el número de likes en la página
    j.attr(j.id('likeBtn'), 'data-likeCount', post.likes)
    // Incluir los comentarios del post en la página
    // ACLARACIÓN: se usa for ... of ... porque forEach no está diseñado para operaciones asíncronas
    for (const comment of post.comments) {
      const commentAuthor = await getUsernameById(comment.authorId)
      console.log(commentAuthor)
      await generatePostComment({
        author: commentAuthor || 'DeletedUser',
        content: comment.content,
        parent: j.id('postComments'),
        postId: post._id
      })
    }
    // Si el usuario ya ha comentado en el post, cambiar el valor del botón de submit
    if (j.getQuery(document.body, '[data-byuser]')) {
      j.changeValue(j.id('commentSubmit'), 'Editar comentario')
    }
    // Añadir los handlers al formulario para comentar y el botón de like
    j.ev(j.id('commentForm'), 'submit', commentFormHandler(post._id))
    j.ev(j.id('likeBtn'), 'click', likeHandler(post._id))
  } catch (err) {
    // Generar un error
    return generateError({
      message: err.message,
      parent: document.body
    })
  } finally {
    // Ocultar el loader
    hideLoader()
  }
}
start()
