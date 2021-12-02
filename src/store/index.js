import { createStore } from 'vuex'
import usuarioModule from '../modules/usuario'
import clienteModule from '../modules/cliente'
import operadorModule from '../modules/operador'

export default createStore({
  modules: {
    usuarioModule,
    clienteModule,
    operadorModule
  }
})
