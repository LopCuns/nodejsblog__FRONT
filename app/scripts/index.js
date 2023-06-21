import j from './helpers/lib.js'
import searchPostHandler from './events/searchPost.handler.js'
import loadLatestPosts from './start/loadLatestPosts.js'

const start = async () => {
  j.ev(j.id('searchForm'), 'submit', searchPostHandler)
  loadLatestPosts()
  // Si el usuario está logeado
  if (j.getJWT()) {
    j.hide(j.id('registerLink'))
    j.hide(j.id('loginLink'))
    j.show(j.id('profileLink'))
  } else {
    // Si el usuario no está logeado
    j.show(j.id('registerLink'))
    j.show(j.id('loginLink'))
    j.hide(j.id('profileLink'))
  }
}
start()
