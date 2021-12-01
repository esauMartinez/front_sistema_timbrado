import { createStore } from 'vuex'
import usuarioModule from '../modules/usuario'
import clienteModule from '../modules/cliente'
import operadorModule from '../modules/operador'
import tripModule from '../modules/trip'
import postalModule from '../modules/codigoPostal'


export default createStore({
  modules: {
    usuarioModule,
    clienteModule,
    operadorModule,
    tripModule,
    postalModule
  }
})
