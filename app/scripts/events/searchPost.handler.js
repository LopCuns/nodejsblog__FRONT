import j from '../helpers/lib.js'
import generatePostSampleElement from '../components/post_sample.component.js'
import BODY from '../enviornment.js'
import getHTML from '../helpers/getHTML.js'
const fetchHeaders = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzMzMGVmMi0wYWMwLTExZWUtYmU1Ni0wMjQyYWMxMjAwMDIiLCJpYXQiOjE2ODY3NTMyNTMsImV4cCI6MTY4NzM1ODA1M30.ZT3HwRyVoWlJgoz3MpwkrjGOUt0pKU5mVa68N_7IqDM'
  }
}

const searchPostHandler = async (e) => {
  e.preventDefault()
  console.log('all')
  const searchInput = j.id('searchInput')
  const searchValue = searchInput.value
  if (j.isUuid4(searchValue)) {
    const postRequest = await j.toFetch(
      `https://jlblog.onrender.com/posts/get-byid/${searchValue}`,
      'json',
      fetchHeaders
    )
    if (postRequest.statusCode !== 200) console.log(await postRequest.output)
    const post = await postRequest.output
    generatePostSampleElement({
      author: 'unknown',
      title: post.title,
      likes: post.likes,
      comments: post.comments.length,
      template: await getHTML('app/html/components/post_sample.component.html'),
      stylesRoute: 'app/styles/css/post_sample.component.css',
      parent: BODY
    })
  }
}

export default searchPostHandler
