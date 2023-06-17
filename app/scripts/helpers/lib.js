const j = {
  toFetch: async (src, format, options = {}) => {
    const fetching = await fetch(src, options)
    const output =
      format === 'json'
        ? fetching.json()
        : format === 'text'
          ? fetching.text()
          : fetching
    return { statusCode: fetching.status, output }
  },
  getQuery: (parent, selector) => {
    return parent.querySelector(selector)
  },
  getQueryCurry: (parent) => {
    return (selector) => {
      return parent.querySelector(selector)
    }
  },
  setText: (element, txt, rtr = true) => {
    element.textContent = txt
    if (rtr) return element
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
  }
}

export default j
