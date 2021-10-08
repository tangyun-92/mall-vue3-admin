import { configure, start, done } from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import router from './router'
import store from './store'
import getPageTitle from './utils/get-page-title'

configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  start()
  // determine whether the user has logged in
  const hasToken = store.state.user.token
  if (hasToken) {
    // set page title
    document.title = getPageTitle(to.meta.title)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      done()
    } else {
      const routes = router.getRoutes().filter((r) => r.path === to.path)
      if (routes.length) {
        next()
      } else {
        // Otherwise jump to 404
        next('/404')
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
      done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  done()
})
