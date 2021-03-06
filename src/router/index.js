import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/cliente',
    component: () => import(/* webpackChunkName: "client" */ '../layouts/Client.vue'),
    meta: { requiresAuth: true},
    children: [
      {
        path: '/categorias',
        name: 'Home',
        meta: { requiresAuth: true},
        component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
      },
      {
        path: '/categorias/:id',
        name: 'Catalogue',
        meta: { requiresAuth: true},
        component: () => import(/* webpackChunkName: "catalogue" */ '../views/Catalogue.vue')
      },
      {
      path: '/carrito',
        name: 'Cart',
        meta: { requiresAuth: true},
        component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
      },
      
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
    meta: { requiresAuth: false}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!("emprendedora" in localStorage)) {
      next('/')
    }else {
      
      next()
    }
  }else {
    if(("emprendedora" in localStorage))
      next({path: "/categorias"})
    else
      next()
  }
})

export default router
