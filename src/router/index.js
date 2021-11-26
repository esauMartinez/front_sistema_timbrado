import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Cliente from '../views/Cliente.vue'
import formCliente from '../components/cliente/form.vue'

import Operador from '../views/Operador.vue'
import Remolque from '../views/Remolque.vue'
import Unidad from '../views/Unidad.vue'
import Patio from '../views/Patio.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/form-cliente',
    name: 'form-cliente',
    component: formCliente
  },
  {
    path: '/operador',
    name: 'Operador',
    component: Operador
  },
  {
    path: '/remolque',
    name: 'Remolque',
    component: Remolque
  },
  {
    path: '/unidad',
    name: 'Unidad',
    component: Unidad
  },
  {
    path: '/patio',
    name: 'Patio',
    component: Patio
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
