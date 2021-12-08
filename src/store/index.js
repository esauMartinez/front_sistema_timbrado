import { createStore } from 'vuex'
import usuarioModule from '../modules/usuario'
import clienteModule from '../modules/cliente'
import operadorModule from '../modules/operador'
import tripModule from '../modules/trip'
import postalModule from '../modules/codigoPostal'
import cotizacionModule from '../modules/cotizacion'
import empresaModule from '../modules/empresa'

import remolqueModule from '../modules/remolque'
import patioModule from '../modules/patio'
import unidadModule from '../modules/unidad'

export default createStore({
  modules: {
    usuarioModule,
    clienteModule,
    operadorModule,
    tripModule,
    postalModule,
    cotizacionModule,
    empresaModule,
    remolqueModule,
    patioModule,
    unidadModule
  }
})
