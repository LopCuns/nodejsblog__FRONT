import j from '../../helpers/lib.js'
import uuid4 from '../../helpers/uuid4.js'
import requestModel from './requestModel.js'

export const getUsernameById = async (_id) => {
  try {
    const username = (
      await requestModel({
        path: `/user/get-username/${_id}`,
        fetchOptions: { headers: { Authorization: `Bearer ${j.getJWT()}` } }
      })
    ).username
    return username
  } catch (err) {
    return 'DeletedUser'
  }
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
  try {
    const userProfile = await requestModel({
      path: '/user/profile',
      fetchOptions: { headers: { Authorization: `Bearer ${j.getJWT()}` } }
    })
    return userProfile
  } catch (err) {
    return {
      _id: 'none',
      username: 'Guest',
      role: 'Guest',
      email: 'none',
      password: 'none',
      posts: [],
      likedPosts: []
    }
  }
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

export const userUnregister = ({ email, password }) => {
  return requestModel({
    path: '/user/unregister',
    fetchOptions: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
  })
}
