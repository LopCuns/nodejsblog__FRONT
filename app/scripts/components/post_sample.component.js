import getHTML from '../helpers/getHTML.js'
import j from '../helpers/lib.js'

class Postsample extends HTMLDivElement {
  constructor (author, title, likes, comments, date, template, stylesRoute) {
    // Heredar de div
    super()
    // Definir las propiedades de la clase
    this.author = author
    this.title = title
    this.likes = likes
    this.comments = comments
    this.date = date
    this.template = template
    this.stylesRoute = stylesRoute
    // Crear el shadow root
    this.attachShadow({ mode: 'open' })
  }

  // Función que se ejecutará cuando se defina un elemento post-sample
  connectedCallback () {
    // Añadir la clase post_sample al elemento
    j.addClass(this, 'post_sampleContainer')
    // Función para obtener un elemento por query y su parentNode
    const getFromTemplate = j.getQueryCurry(this.template)
    // Cambiar el texto del elemento con data-pauthor por el autor del post
    j.setText(getFromTemplate('[data-pauthor]'), this.author)
    // Cambiar el texto del elemento con data-ptitle por el título del post
    j.setText(getFromTemplate('[data-ptitle]'), this.title)
    // Cambiar el texto del elemento con data-plikes por el número de likes en el post
    j.setText(getFromTemplate('[data-plikes]'), this.likes)
    // Cambiar el texto del elemento con data-pcomments por el número de comentarios en el post
    j.setText(getFromTemplate('[data-pcomments]'), this.comments)
    // Cambiar el texto del elemento con data-pdate por la fecha de publicación del post
    j.setText(getFromTemplate('[data-pdate]'), this.date)
    // Incorporar el template al shadowRoot
    this.shadowRoot.appendChild(this.template)
    // Importar en el componente los estilos de la stylesRoute
    const styles = j.el('style')
    j.setText(styles, `@import "${this.stylesRoute}"`)
    // Añadir evento click que redirije a la página para ver el post completo
    j.ev(this, 'click', () => {
      window.location = `app/html/pages/view_post.html?author=${this.author}&title=${this.title}`
    })
    this.shadowRoot.appendChild(styles)
  }
}
// Definir el custom element
customElements.define('post-sample', Postsample, { extends: 'div' })

// Función que crea un elemento post-sample y lo incluye en un elemento del DOM (parent)
const generatePostSampleElement = async ({
  author,
  title,
  likes,
  comments,
  date,
  parent
}) => {
  parent.appendChild(
    new Postsample(
      author,
      title,
      likes,
      comments,
      date,
      await getHTML('/app/html/components/post_sample.component.html'),
      '/app/styles/css/post_sample.component.css'
    )
  )
}
export default generatePostSampleElement
