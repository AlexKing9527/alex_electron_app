import Vue from 'vue'
import Router from 'vue-router'

// 连续点击多次路由报错解决
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const indexRouter = {
  path: '/',
  name: 'index',
  component: require('@/components/index').default
}

const backUpRouter = {
  path: '*',
  redirect: '/'
}

const routes = [
  indexRouter,
  backUpRouter
]

// 路由加载时滚动条到顶
const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_publicPath,
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    location.reload()
  }
})

export default router
