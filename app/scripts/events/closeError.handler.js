const closeErrorHandler = (e) => {
  // Obtener el elemento del light DOM que funciona como host del componente
  const lightDOMError = e.target.parentNode.getRootNode().host
  // Eliminar el elemento del DOM
  lightDOMError.remove()
  // Redireccionar al usuario a la página principal
  const requireRedirect = ['/app/html/pages/view_post']
  if (requireRedirect.indexOf(window.location.pathname) !== -1) window.location = '/index.html'
}
export default closeErrorHandler
