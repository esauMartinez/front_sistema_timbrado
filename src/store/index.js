import { createStore } from 'vuex'
import usuarioModule from '../modules/usuario'
import clienteModule from '../modules/cliente'


export default createStore({
  modules: {
    usuarioModule,
    clienteModule
  }
})
