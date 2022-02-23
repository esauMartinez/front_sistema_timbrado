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
import crearRemolque from '../components/remolque/crear.vue'
import modificarRemolque from '../components/remolque/modificar.vue'

import Unidad from '../views/Unidad.vue'
import crearUnidad from '../components/unidad/crear.vue'
import modificarUnidad from '../components/unidad/modificar.vue'

import Patio from '../views/Patio.vue'
import crearPatio from '../components/patio/crear.vue'
import modificarPatio from '../components/patio/modificar.vue'

import Trip from '../views/Trip'
import crearTrip from '../components/trip/crear.vue'
import modificarTrip from '../components/trip/modificar.vue'

import Usuario from '../views/usuario.vue'
import crearUsuario from '../components/usuario/crear.vue'
import modificarUsuario from '../components/usuario/modificar.vue'

import Root from '../views/Root.vue'
import crearEmpresa from '../components/empresa/crear.vue'
import modificarEmpresa from '../components/empresa/modificar.vue'

import Servicio from '../views/Servicio'
import crearServicio from '../components/servicio/crear.vue'

import Timbre from '../views/Timbre.vue'

import Ajustes from '../views/Ajustes.vue'

import verifyUser from '../guards'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/root',
    name: 'Root',
    component: Root,
    beforeEnter: [verifyUser],
  },
  {
    path: '/crear-empresa',
    name: 'crear-empresa',
    component: crearEmpresa,
    beforeEnter: [verifyUser],
  },
  {
    path: '/modificar-empresa/:id',
    name: 'modificar-empresa',
    component: modificarEmpresa,
    beforeEnter: [verifyUser],
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: [verifyUser]
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-cliente',
    name: 'crear-cliente',
    component: crearCliente,
    beforeEnter: [verifyUser]
  },
  {
    path: '/modificar-cliente/:id',
    name: 'modificar-cliente',
    component: modificarCliente,
    beforeEnter: [verifyUser]
  },
  {
    path: '/operador',
    name: 'Operador',
    component: Operador,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-operador',
    name: 'crear-operador',
    component: crearOperador,
    beforeEnter: [verifyUser]
  },
  {
    path: '/modificar-operador/:id',
    name: 'modificar-operador',
    component: modificarOperador,
    beforeEnter: [verifyUser]
  },
  {
    path: '/remolque',
    name: 'Remolque',
    component: Remolque,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-remolque',
    name: 'crear-remolque',
    component: crearRemolque,
    beforeEnter: [verifyUser]
  }, {
    path: '/modificar-remolque/:id',
    name: 'modificar-remolque',
    component: modificarRemolque,
    beforeEnter: [verifyUser]
  },
  {
    path: '/unidad',
    name: 'Unidad',
    component: Unidad,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-unidad',
    name: 'crear-unidad',
    component: crearUnidad,
    beforeEnter: [verifyUser]
  }, {
    path: '/modificar-unidad/:id',
    name: 'modificar-uniad',
    component: modificarUnidad,
    beforeEnter: [verifyUser]
  },
  {
    path: '/patio',
    name: 'Patio',
    component: Patio,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-patio',
    name: 'crear-patio',
    component: crearPatio,
    beforeEnter: [verifyUser]
  }, {
    path: '/modificar-patio/:id',
    name: 'modificar-patio',
    component: modificarPatio,
    beforeEnter: [verifyUser]
  },
  {
    path: '/trip',
    name: 'Trip',
    component: Trip,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-trip',
    name: 'crear-trip',
    component: crearTrip,
    beforeEnter: [verifyUser]
  },
  {
    path: '/cotizacion',
    name: 'Cotizacion',
    component: Cotizacion,
    beforeEnter: [verifyUser]
  },
  {
    path: '/llenar-cotizacion/:id',
    name: 'llenar-cotizacion',
    component: modificarCotizacion,
    beforeEnter: [verifyUser]
  },
  {
    path: '/ver-cotizacion/:id',
    name: 'ver-cotizacion',
    component: verCotizacion,
    beforeEnter: [verifyUser]
  },
  {
    path: '/modificar-trip/:id',
    name: 'modificar-trip',
    component: modificarTrip,
    beforeEnter: [verifyUser]
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-usuario',
    name: 'crear-usuario',
    component: crearUsuario,
    beforeEnter: [verifyUser]
  },
  {
    path: '/modificar-usuario/:id',
    name: 'modificar-usuario',
    component: modificarUsuario,
    beforeEnter: [verifyUser]
  },
  {
    path: '/ver-usuario/:id',
    name: 'ver-usuario',
    component: modificarUsuario,
    beforeEnter: [verifyUser]
  },
  {
    path: '/servicio',
    name: 'Servicio',
    component: Servicio,
    beforeEnter: [verifyUser]
  },
  {
    path: '/crear-servicio',
    name: 'crear-servicio',
    component: crearServicio,
    beforeEnter: [verifyUser]
  },
  {
    path: '/ajustes',
    name: 'ajustes',
    component: Ajustes,
    beforeEnter: [verifyUser]
  },
  {
    path: '/timbre',
    name: 'timbre',
    component: Timbre,
    beforeEnter: [verifyUser]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
