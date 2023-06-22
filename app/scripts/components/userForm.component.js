import j from '../helpers/lib.js'

// Parte del userForm
const submitBtn = (message) => {
  return j.addClass(
    j.attr(j.changeValue(j.el('input'), message), 'type', 'submit'),
    'userForm__submit'
  )
}
// Parte del userForm
const link = (href, text) => {
  return j.addClass(
    j.setText(j.attr(j.el('a'), 'href', href), text),
    'userForm__link'
  )
}
// Parte del userForm
const close = () => {
  return j.attr(
    j.addClass(j.setText(j.el('button'), 'Cerrar'), 'userForm__close'),
    'type',
    'button'
  )
}
// Parte del userForm
const formField = (input) => {
  // Crear un contenedor
  const container = j.addClass(j.el('div'), 'userForm__field')
  // Crear un label
  const label = j.setText(
    j.addClass(
      j.attr(j.el('label'), 'for', j.getAttrValue(input, 'id')),
      'userForm__label'
    ),
    j.getAttrValue(input, 'data-label')
  )
  // Incorporar el label y el input al contenedor
  container.append(label)
  container.append(input)
  // Devolver el contenedor
  return container
}

class userForm extends HTMLElement {
  constructor () {
    // Heredar de HTMLElement
    super()
    // Fijar las características del componente
    this.submit = j.getAttrValue(this, 'data-submit')
    this.linktext = j.getAttrValue(this, 'data-linktext')
    this.linkhref = j.getAttrValue(this, 'data-linkhref')
    this.close = this.hasAttribute('data-close')
    this.formElement = j.addClass(j.el('form'), 'userForm')
    // Establecer el shadowRoot
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    // Obtener los inputs del formulario y transformarlos en campos
    const inputs = Array.from(this.children)
      .filter((el) => el.tagName === 'INPUT')
      .map((input) => formField(input))
    // Incorporar los campos en el formulario
    if (inputs) {
      inputs.forEach((input) => this.formElement.append(input))
    }
    // Si hay submit, crear un submitBtn e incorporarlo al formulario
    if (this.submit) {
      this.formElement.append(submitBtn(this.submit))
    }
    // Si hay link, crear un link e incorporarlo al formulario
    if (this.linktext && this.linkhref) {
      this.formElement.append(link(this.linkhref, this.linktext))
    }
    // Si hay close, crear un boton de cerrar e incorporarlo al formulario
    if (this.close) this.formElement.append(close())
    this.shadowRoot.append(this.formElement)
    // Añadir los estilos al componente
    const style = j.setText(
      j.el('style'),
      '@import "/app/styles/css/userForm.css"'
    )
    this.shadowRoot.append(style)

    // Función para obtener elementos a partir del componente
    const getFromComponent = j.getQueryCurry(this.shadowRoot)
    // Añadir event listener para cerrar el formulario
    if (this.close) {
      j.ev(getFromComponent('.userForm__close'), 'click', () => j.hide(this))
    }
  }
}

customElements.define('user-form', userForm)
