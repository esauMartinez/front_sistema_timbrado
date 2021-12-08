import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Cotizacion from '../views/Cotizacion.vue'
import modificarCotizacion from '../components/cotizacion/modificar.vue'
import verCotizacion from '../components/cotizacion/ver.vue'

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

import Usuario from '../views/usuario.vue'
import crearUsuario from '../components/usuario/crear.vue'
import modificarUsuario from '../components/usuario/modificar.vue'

import Root from '../views/Root.vue'
import crearEmpresa from '../components/empresa/crear.vue'
import modificarEmpresa from '../components/empresa/modificar.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/root',
    name: 'Root',
    component: Root
  },
  {
    path: '/crear-empresa',
    name: 'crear-empresa',
    component: crearEmpresa
  },
  {
    path: '/modificar-empresa/:id',
    name: 'modificar-empresa',
    component: modificarEmpresa
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
    path: '/llenar-cotizacion/:id',
    name: 'llenar-cotizacion',
    component: modificarCotizacion
  },
  {
    path: '/ver-cotizacion/:id',
    name: 'ver-cotizacion',
    component: verCotizacion
  },
  {
    path: '/modificar-trip/:id',
    name: 'modificar-trip',
    component: modificarTrip
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario
  },
  {
    path: '/crear-usuario',
    name: 'crear-usuario',
    component: crearUsuario
  },
  {
    path: '/modificar-usuario/:id',
    name: 'modificar-usuario',
    component: modificarUsuario
  },
  {
    path: '/ver-usuario/:id',
    name: 'ver-usuario',
    component: modificarUsuario
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
