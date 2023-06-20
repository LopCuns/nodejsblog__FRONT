import j from '../helpers/lib.js'
import getHTML from '../helpers/getHTML.js'
import { getUserProfile } from '../helpers/requests/user.requests.js'
import deleteCommentHandler from '../events/deleteComment.handler.js'

class PostComment extends HTMLDivElement {
  constructor (author, content, template, stylesRoute, postId) {
    // Heredar de htmldiv
    super()
    // Establecer las propiedades del componente
    this.author = author
    this.content = content
    this.template = template
    this.stylesRoute = stylesRoute
    this.postId = postId
    this.attachShadow({ mode: 'open' })
  }

  // Función que se ejecuta al instanciar un elemento de esta clase
  async connectedCallback () {
    j.addClass(this, 'post__comments__comment')
    // Función para obtener elementos a partir del template
    const getFromTemplate = j.getQueryCurry(this.template)
    // Cambiar el texto por el autor del comentario
    j.setText(getFromTemplate('[data-cauthor]'), this.author)
    // Cambiar el texto por el contenido del comentario
    j.setText(getFromTemplate('[data-ccontent]'), this.content)
    // Incorporar el template al shadowRoot
    this.shadowRoot.appendChild(this.template)
    // Incorporar los estilos al shadowRoot
    const styles = j.setText(j.el('style'), `@import "${this.stylesRoute}"`)
    this.shadowRoot.appendChild(styles)
    // Si el usuario no es autor del comentario, retirar el botón para eliminarlo
    const delCommentBtn = getFromTemplate('[data-cdel]')
    if ((await getUserProfile()).username !== this.author) { return delCommentBtn.remove() }
    // Atributo para operar con el comentario hecho por el usuario
    j.attr(this, 'data-byuser', true)
    // Si el usuario es el autor del comentario, añadir el listener para eliminar el comentario
    j.ev(delCommentBtn, 'click', deleteCommentHandler(this.postId))
  }
}

customElements.define('post-comment', PostComment, { extends: 'div' })

const generatePostComment = async ({ author, content, parent, postId }) => {
  parent.appendChild(
    new PostComment(
      author,
      content,
      await getHTML('/app/html/components/comment.component.html'),
      '/app/styles/css/comment.component.css',
      postId
    )
  )
}
export default generatePostComment
