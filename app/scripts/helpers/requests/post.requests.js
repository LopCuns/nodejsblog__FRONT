import j from '../lib.js'
import { BASEURL } from '../../server/enviorment.js'

export const getPostById = async (_id) => {
  // Buscar post por su _id
  const request = await j.toFetch(
    `${BASEURL}/posts/get-byid/${_id}`,
    'json',
    { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  )
  // Si la respuesta no es satisfactoria, lanzar un error con su código y mensaje
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  // Devolver el post
  return await request.output
}

export const getPostByTitleAuthor = async (title, author) => {
  const request = await j.toFetch(
    `${BASEURL}/posts/get?author=${author}&title=${title}`,
    'json',
    { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}

export const getLatestPosts = async () => {
  const request = await j.toFetch(
    `${BASEURL}/posts/get-latest`,
    'json',
    {}
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}

export const likePost = async (postId) => {
  const request = await j.toFetch(
    `${BASEURL}/posts/like/${postId}`,
    'json',
    { method: 'POST', headers: { Authorization: `Bearer ${j.getJWT()}` } }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}

export const dislikePost = async (postId) => {
  const request = await j.toFetch(
    `${BASEURL}/posts/dislike/${postId}`,
    'json',
    { method: 'POST', headers: { Authorization: `Bearer ${j.getJWT()}` } }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}

export const commentPost = async (postId, content) => {
  const request = await j.toFetch(
    `${BASEURL}/posts/comment/${postId}`,
    'json',
    { method: 'POST', headers: { Authorization: `Bearer ${j.getJWT()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) }
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}
