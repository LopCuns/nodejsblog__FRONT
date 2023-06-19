import j from './helpers/lib.js'
import searchPostHandler from './events/searchPost.handler.js'
import loadLatestPosts from './start/loadLatestPosts.js'

const start = async () => {
  j.ev(j.id('searchForm'), 'submit', searchPostHandler)
  loadLatestPosts()
}
start()
