import j from '../lib.js'
import { BASEURL } from '../../server/enviorment.js'

const requestModel = async ({ path, fetchOptions = {} }) => {
  // Hacer una petición a la base de datos
  const request = await j.toFetch(`${BASEURL}${path}`, 'json', fetchOptions)
  // Si la respuesta no es satisfactoria, lanzar un error con su código y mensaje
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  // Devolver el username
  return await request.output
}
export default requestModel
