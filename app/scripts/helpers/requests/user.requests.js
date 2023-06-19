import j from '../lib.js'
import { BASEURL } from '../../server/enviorment.js'

export const getUsernameById = async (_id) => {
  // Buscar usernmae por _id del usuario
  const request = await j.toFetch(
    `${BASEURL}/user/get-username/${_id}`,
    'json',
    { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  )
  // Si la respuesta no es satisfactoria, lanzar un error con su código y mensaje
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  // Devolver el username
  return (await request.output).username
}

export const registerUser = async ({ username, email, password }) => {
  const userData = {
    _id: j.uuid4(),
    username,
    role: 'user',
    email,
    password,
    posts: [],
    likedPosts: []
  }
  const request = await j.toFetch(
    `${BASEURL}/user/register`,
    'json',
    { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(userData) }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}

export const loginUser = async ({ email, password }) => {
  const request = await j.toFetch(
    `${BASEURL}/user/login`,
    'json',
    { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ email, password }) }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}
export const getUserProfile = async () => {
  const request = await j.toFetch(
    `${BASEURL}/user/profile`,
    'json',
    { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}