import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('./components/Main'),
      beforeEnter(to, from, next) {
        if (!localStorage.getItem('token')) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login'),
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./components/Profile'),
      beforeEnter(to, from, next) {
        if (!localStorage.getItem('token')) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('./components/List'),
      beforeEnter(to, from, next) {
        if (!localStorage.getItem('token')) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/newuser',
      name: 'NewUser',
      component: () => import('./components/NewUser'),
    }
  ]
})
