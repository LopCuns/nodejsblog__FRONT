import j from './helpers/lib.js'
import { getPostByTitleAuthor } from './helpers/requests.js'
import commentFormHandler from './events/commentForm.handler.js'
import likeHandler from './events/like.handler.js'
const start = async () => {
  try {
    // Obtener el title y el author del post de los params de location
    const { title, author } = j.getQueryParameters(location.href)
    // Obtener el post a partir de su title y su author
    const post = await getPostByTitleAuthor(title, author)
    // Incluir el titulo del post en la página
    j.setText(j.id('postTitle'), title.replaceAll('%20', ' '))
    // Incluir el autor del post en la página
    j.setText(j.id('postAuthor'), `by ${author}`)
    // Incluir el contenido del post en la página
    j.setText(j.id('postContent'), post.content)
    // Añadir los handlers al formulario para comentar y el botón de like
    j.ev(j.id('commentForm'), 'submit', commentFormHandler)
    j.ev(j.id('likeBtn'), 'click', likeHandler)
  } catch (err) {
    // Imprimir en pantalla el mensaje de error
    console.error(err.message)
  }
}
start()
