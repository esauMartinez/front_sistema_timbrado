import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Cotizacion from '../views/Cotizacion.vue'

import Cliente from '../views/Cliente.vue'
import crearCliente from '../components/cliente/crear.vue'
import modificarCliente from '../components/cliente/modificar.vue'

import Operador from '../views/Operador.vue'
import crearOperador from '../components/operador/crear.vue'
import modificarOperador from '../components/operador/modificar.vue'

import Remolque from '../views/Remolque.vue'
import Unidad from '../views/Unidad.vue'
import Patio from '../views/Patio.vue'

import Trip from '../views/Trip'
import crearTrip from '../components/trip/crear.vue'
import modificarTrip from '../components/trip/modificar.vue'

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
    path: '/crear-cliente',
    name: 'crear-cliente',
    component: crearCliente
  },
  {
    path: '/modificar-cliente/:id',
    name: 'modificar-cliente',
    component: modificarCliente
  },
  {
    path: '/operador',
    name: 'Operador',
    component: Operador
  },
  {
    path: '/crear-operador',
    name: 'crear-operador',
    component: crearOperador
  },
  {
    path: '/modificar-operador/:id',
    name: 'modificar-operador',
    component: modificarOperador
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
  {
    path: '/trip',
    name: 'Trip',
    component: Trip
  },
  {
    path: '/crear-trip',
    name: 'crear-trip',
    component: crearTrip
  },
  {
    path: '/cotizacion',
    name: 'Cotizacion',
    component: Cotizacion
  },
  {
    path: '/modificar-trip/:id',
    name: 'modificar-trip',
    component: modificarTrip
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
