import j from './lib.js'

const fetchOptions = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiOWUxYzNhNC0wOTUzLTExZWUtYmU1Ni0wMjQyYWMxMjAwMDIiLCJpYXQiOjE2ODY5ODczNzYsImV4cCI6MTY4NzU5MjE3Nn0.kc5JmLq_iiBxbcKMGuYcZy3kbfcVY_RZZCEyqJw78d8'
  }
}

export const getPostById = async (_id) => {
  // Buscar post por su _id
  const request = await j.toFetch(
    `https://jlblog.onrender.com/posts/get-byid/${_id}`,
    'json',
    fetchOptions
  )
  // Si la respuesta no es satisfactoria, lanzar un error con su código y mensaje
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  // Devolver el post
  return await request.output
}

export const getUsernameById = async (_id) => {
  // Buscar usernmae por _id del usuario
  const request = await j.toFetch(
    `https://jlblog.onrender.com/user/get-username/${_id}`,
    'json',
    fetchOptions
  )
  // Si la respuesta no es satisfactoria, lanzar un error con su código y mensaje
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  // Devolver el username
  return (await request.output).username
}

export const getPostByTitleAuthor = async (title, author) => {
  const request = await j.toFetch(
    `https://jlblog.onrender.com/posts/get?author=${author}&title=${title}`,
    'json',
    fetchOptions
  )
  if (!request.ok) {
    throw new Error(`${request.statusCode}:${(await request.output).errors}`)
  }
  return await request.output
}
