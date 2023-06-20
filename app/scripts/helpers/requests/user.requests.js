import j from '../lib.js'
import uuid4 from '../uuid4.js'
import requestModel from './requestModel.js'

export const getUsernameById = async (_id) => {
  return (
    await requestModel({
      path: `/user/get-username/${_id}`,
      fetchOptions: { headers: { Authorization: `Bearer ${j.getJWT()}` } }
    })
  ).username
}

export const registerUser = async ({ username, email, password }) => {
  const userData = {
    _id: uuid4(),
    username,
    role: 'user',
    email,
    password,
    posts: [],
    likedPosts: []
  }
  return requestModel({
    path: '/user/register',
    fetchOptions: {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userData)
    }
  })
}

export const loginUser = async ({ email, password }) => {
  return requestModel({
    path: '/user/login',
    fetchOptions: {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
  })
}
export const getUserProfile = async () => {
  return requestModel({
    path: '/user/profile',
    fetchOptions: { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  })
}
