import j from './lib.js'
// Función que lee un archivo HTML y devuelve un templeta del elemento con el data-getMe

const getHTML = async (rout) => {
  try {
    // Obtener el HTML crudo de la ruta indicada
    const rawHTML = await (await j.toFetch(rout, 'text')).output
    // Si no se ha podido leer el archivo HTML, entonces enviar un error
    if (rawHTML.includes('Cannot GET')) {
      throw new Error('No se ha podido leer el archivo HTML')
    }
    // Crear una instancia de DOMParser para obtener el DOM del HTML
    const parser = new DOMParser()
    // Obtener el DOM del archivo HTML
    const HTML = parser.parseFromString(rawHTML, 'text/html')
    // Devolver el elemento con el atributo data-getme si existe, y si no, devolver el body del HTML
    return (j.getQuery(HTML.body, '[data-getme]') ?? HTML.body).cloneNode(true)
  } catch (err) {
    // Devolver el objeto de error
    return err
  }
}

export default getHTML
