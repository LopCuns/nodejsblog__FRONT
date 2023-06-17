import j from '../helpers/lib.js'
import closeErrorHandler from '../events/closeError.handler.js'
import getHTML from '../helpers/getHTML.js'

class ErrorComponent extends HTMLDivElement {
  constructor (message, template, stylesRoute) {
    // Heredar de html div
    super()
    // Establecer las propieadades del custom element
    this.message = message
    this.template = template
    this.stylesRoute = stylesRoute
    // Crear el shadowRoot
    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    // Añadir la clase de error_component al elemento
    j.addClass(this, 'error_component')
    // Función para obtener un elemento hijo de this.template por query
    const getFromTemplate = j.getQueryCurry(this.template)
    // Cambiar el texto del mensaje por el pasado al constructor
    j.setText(getFromTemplate('[data-emessage]'), this.message)
    // Añadir un event listener al botón de cerrar
    j.ev(getFromTemplate('[data-eclose]'), 'click', closeErrorHandler)
    // Insertar el template al shadowRoot
    this.shadowRoot.appendChild(this.template)
    // Crear los estilos del custom element
    const styles = j.el('style')
    // Insertar los estilos en el shadowRoot
    j.setText(styles, `@import "${this.stylesRoute}"`)
    // Incorporar los estilos en el shadowRoot
    this.shadowRoot.appendChild(styles)
  }
}

customElements.define('jl-error', ErrorComponent, { extends: 'div' })

const generateError = async ({ message, parent }) => {
  parent.appendChild(
    new ErrorComponent(
      message,
      await getHTML('/app/html/components/error.component.html'),
      '/app/styles/css/error.component.css'
    )
  )
}
export default generateError
