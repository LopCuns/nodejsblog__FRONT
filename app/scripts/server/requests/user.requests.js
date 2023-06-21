import j from '../../helpers/lib.js'
import uuid4 from '../../helpers/uuid4.js'
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

export const updateUsername = async ({ newUsername }) => {
  console.log(newUsername)
  return requestModel({
    path: '/user/update-username',
    fetchOptions: {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newUsername })
    }
  })
}

export const updateEmail = async ({ newEmail, password }) => {
  return requestModel({
    path: '/user/update-email',
    fetchOptions: {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newEmail, password })
    }
  })
}

export const updatePassword = async ({ oldPassword, newPassword }) => {
  return requestModel({
    path: '/user/update-password',
    fetchOptions: {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oldPassword, newPassword })
    }
  })
}
