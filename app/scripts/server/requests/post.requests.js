import j from '../../helpers/lib.js'
import requestModel from './requestModel.js'

export const getPostById = async (_id) => {
  return requestModel({
    path: `/posts/get-byid/${_id}`,
    fetchOptions: { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  })
}

export const getPostByTitleAuthor = async (title, author) => {
  return requestModel({
    path: `/posts/get?author=${author}&title=${title}`,
    fetchOptions: { headers: { Authorization: `Bearer ${j.getJWT()}` } }
  })
}

export const getLatestPosts = async () => {
  return requestModel({ path: '/posts/get-latest' })
}

export const likePost = async (postId) => {
  return requestModel({
    method: 'POST',
    path: `/posts/like/${postId}`,
    fetchOptions: {
      method: 'POST',
      headers: { Authorization: `Bearer ${j.getJWT()}` }
    }
  })
}

export const dislikePost = async (postId) => {
  return requestModel({
    method: 'POST',
    path: `/posts/dislike/${postId}`,
    fetchOptions: {
      method: 'POST',
      headers: { Authorization: `Bearer ${j.getJWT()}` }
    }
  })
}

export const commentPost = async (postId, content) => {
  return requestModel({
    path: `/posts/comment/${postId}`,
    fetchOptions: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    }
  })
}

export const deletePostComment = async (postId) => {
  return requestModel({
    path: `/posts/comment-delete/${postId}`,
    fetchOptions: {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${j.getJWT()}` }
    }
  })
}

export const modifyPostComment = async (postId, content) => {
  return requestModel({
    path: `/posts/comment-edit/${postId}`,
    fetchOptions: {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    }
  })
}

export const createPost = async (post) => {
  return requestModel({
    path: '/posts/create',
    fetchOptions: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${j.getJWT()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }
  })
}
