import j from '../helpers/lib.js'
import getHTML from '../helpers/getHTML.js'

class PostComment extends HTMLDivElement {
  constructor (author, content, template, stylesRoute) {
    // Heredar de htmldiv
    super()
    // Establecer las propiedades del componente
    this.author = author
    this.content = content
    this.template = template
    this.stylesRoute = stylesRoute
    this.attachShadow({ mode: 'open' })
  }

  // Función que se ejecuta al instanciar un elemento de esta clase
  connectedCallback () {
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
  }
}

customElements.define('post-comment', PostComment, { extends: 'div' })

const generatePostComment = async ({ author, content, parent }) => {
  parent.appendChild(new PostComment(
    author,
    content,
    await getHTML('/app/html/components/comment.component.html'),
    '/app/styles/css/comment.component.css'
  ))
}
export default generatePostComment
