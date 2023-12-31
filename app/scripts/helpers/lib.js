const j = {
  toFetch: async (src, format, options = {}) => {
    const fetching = await fetch(src, options)
    const output =
      format === 'json'
        ? fetching.json()
        : format === 'text'
          ? fetching.text()
          : fetching
    return { statusCode: fetching.status, ok: fetching.ok, output }
  },
  getQuery: (parent, selector) => {
    return parent.querySelector(selector)
  },
  getQueryCurry: (parent) => {
    return (selector) => {
      return parent.querySelector(selector)
    }
  },
  getAllQuery: (parent, selector) => {
    return parent.querySelectorAll(selector)
  },
  setText: (element, txt) => {
    element.textContent = txt
    return element
  },
  el: (tag) => document.createElement(tag),
  ev: (element, evtype, evHandler) => {
    element.addEventListener(evtype, evHandler)
    return element
  },
  id: (id) => document.getElementById(id),
  isUuid4: (string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      string
    )
  },
  isTitleByAuthor: (string) => {
    return /[a-zA-Z0-9 ]{1,50} by [a-zA-Z0-9]{4,15}/.test(string)
  },
  resetField: (input) => {
    input.value = ''
    return input
  },
  attr: (el, attr, val) => {
    el.setAttribute(attr, val)
    return el
  },
  getAttrValue: (el, attr) => {
    return el.getAttribute(attr)
  },
  addClass: (el, className) => {
    el.classList.add(className)
    return el
  },
  removeClass: (el, className) => {
    el.classList.remove(className)
    return el
  },
  getQueryParameters: (url) => {
    const queryArray = [
      ...url.matchAll(/\??([a-zA-Z0-9]+)=([a-zA-Z0-9%20]+)/g)
    ].map((match) => match.splice(1, 2))
    return Object.fromEntries(queryArray)
  },
  changeCssVar: (varName, newValue) => {
    j.getQuery(document, ':root').style.setProperty(varName, newValue)
  },
  setAllEv: (elements, evtype, evhandler) => {
    elements.forEach((element) => j.ev(element, evtype, evhandler))
  },
  inputError: (input) => {
    const errMessage =
      j.getAttrValue(input, 'data-perror') || 'Error de validación'
    return j.setText(j.addClass(j.el('div'), 'inputError'), errMessage)
  },
  getJWT: () => {
    return localStorage.getItem('jwt')
  },
  noScroll: () => {
    document.body.style = 'overflow: hidden'
  },
  allowScroll: () => {
    document.body.style = ''
  },
  changeValue: (el, newVal) => {
    el.value = newVal
    return el
  },
  show: (el) => {
    j.removeClass(el, 'hidden')
    return el
  },
  hide: (el) => {
    j.addClass(el, 'hidden')
    return el
  },
  getFromShadow: (el, query) => {
    return j.getQuery(el.shadowRoot, query)
  }
}

export default j
