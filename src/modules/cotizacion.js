import Cotizacion from '../classes/cotizacion'
let cotizacion = new Cotizacion();

import Cliente from '../classes/cliente'
let cliente = new Cliente();

import Mercancia from '../classes/mercancia';
let mercancia = new Mercancia();

import router from '../router';

import socket from '../classes/socket'
import store from '../store';

const cotizacionModule = {
    namespaced: true,
    state: () => ({
        cotizacion,
        cliente,
        mercancia,
        socket,
        estatusCotizacion: 'creada',
        codigosOrigen: [],
        codigosDestino: [],
        cotizaciones: []
    }),
    mutations: {
        setEstatus(state, estatus) {
            state.estatusCotizacion = estatus;
        },
        setCodigosPostalesOrigen(state, codigos) {
            state.codigosOrigen = codigos;
        },
        setCodigosPostalesDestino(state, codigos) {
            state.codigosDestino = codigos;
        },
        setCodigoPostalOrigen(state, postal) {
            state.cotizacion.origen.colonia = postal.d_asenta;
            state.cotizacion.origen.c_colonia = postal.id_asenta_cpcons;
            state.cotizacion.origen.municipio = postal.D_mnpio;
            state.cotizacion.origen.c_municipio = postal.c_mnpio;
            state.cotizacion.origen.estado = postal.d_estado;
            state.cotizacion.origen.c_estado = postal.abreviatura_estado;
            state.cotizacion.origen.pais = postal.pais;
            state.cotizacion.origen.c_pais = postal.abreviatura_pais;
            state.cotizacion.origen.localidad = postal.c_cve_ciudad;
            state.codigosOrigen = [];
        },
        setCodigoPostalDestino(state, postal) {
            state.cotizacion.destino.colonia = postal.d_asenta;
            state.cotizacion.destino.c_colonia = postal.id_asenta_cpcons;
            state.cotizacion.destino.municipio = postal.D_mnpio;
            state.cotizacion.destino.c_municipio = postal.c_mnpio;
            state.cotizacion.destino.estado = postal.d_estado;
            state.cotizacion.destino.c_estado = postal.abreviatura_estado;
            state.cotizacion.destino.pais = postal.pais;
            state.cotizacion.destino.c_pais = postal.abreviatura_pais;
            state.cotizacion.destino.localidad = postal.c_cve_ciudad;
            state.codigosDestino = [];
        },
        setCotizaciones(state, cotizaciones) {
            state.cotizaciones = cotizaciones;
        },
        setCotizacion(state, cotizacion) {
            state.cotizacion.id = cotizacion.id;
            state.cotizacion.estatus = cotizacion.estatus;

            state.cotizacion.origen.nombre = cotizacion.origen_nombre;
            state.cotizacion.origen.codigo_postal = cotizacion.origen_codigo_postal;
            state.cotizacion.origen.colonia = cotizacion.origen_colonia;
            state.cotizacion.origen.municipio = cotizacion.origen_municipio;
            state.cotizacion.origen.estado = cotizacion.origen_estado;
            state.cotizacion.origen.pais = cotizacion.origen_pais;
            state.cotizacion.origen.calle = cotizacion.origen_calle;
            state.cotizacion.origen.exterior = cotizacion.origen_exterior;
            state.cotizacion.origen.interior = cotizacion.origen_interior;

            state.cotizacion.destino.nombre = cotizacion.destino_nombre;
            state.cotizacion.destino.codigo_postal = cotizacion.destino_codigo_postal;
            state.cotizacion.destino.colonia = cotizacion.destino_colonia;
            state.cotizacion.destino.municipio = cotizacion.destino_municipio;
            state.cotizacion.destino.estado = cotizacion.destino_estado;
            state.cotizacion.destino.pais = cotizacion.destino_pais;
            state.cotizacion.destino.calle = cotizacion.destino_calle;
            state.cotizacion.destino.exterior = cotizacion.destino_exterior;
            state.cotizacion.destino.interior = cotizacion.destino_interior;
            state.cotizacion.costo_viaje = cotizacion.costo_viaje;

            state.cotizacion.metodo_pago = cotizacion.metodo_pago;
            state.cotizacion.forma_pago = cotizacion.forma_pago;
            state.cotizacion.uso_CFDI = cotizacion.uso_CFDI;
        }
    },
    actions: {
        async postCotizacion({ state, dispatch }) {
            try {
                let response = await cotizacion.create();
                cotizacion.success(response.msg);
                dispatch('getCotizaciones', state.estatusCotizacion);
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async getCotizaciones({ commit }, payload) {
            try {
                let response = await cotizacion.findAll(payload);
                commit('setCotizaciones', response);
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async getCotizacion({ commit, dispatch }, payload) {
            try {
                let response = await cotizacion.findById(payload);

                commit('setCotizacion', response);
                dispatch('getMercanciasCotizacion', payload)
                store.dispatch('conceptoModule/getConceptos', payload);
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async putCotizacion({ dispatch, state }, payload) {
            try {
                let response = await cotizacion.update(payload);
                cotizacion.success(response.msg);
                router.push('/cotizacion');
                dispatch('getCotizaciones', state.estatusCotizacion);
                socket.messageCreada();
            } catch (error) {
                if (error.response.status === 404) {
                    cotizacion.notFound(error.response.data.msg);
                } else {
                    cotizacion.error(error);
                }
            }
        },
        async cotizar({ dispatch, state }, payload) {
            try {
                let response = await cotizacion.cotizar(payload);
                cotizacion.success(response.msg);
                router.push('/cotizacion');
                dispatch('getCotizaciones', state.estatusCotizacion);
                socket.messageCotizar();
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async autorizar({ dispatch, state }, payload) {
            try {
                let response = await cotizacion.autorizar(payload);
                cotizacion.success(response.msg);
                router.push('/cotizacion');
                dispatch('getCotizaciones', state.estatusCotizacion);
                socket.messageAutorizar();
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async searchCpOrigen({ commit }, payload) {
            try {
                if (payload !== '') {
                    let response = await cliente.searchCp(payload);
                    commit('setCodigosPostalesOrigen', response);
                } else {
                    commit('setCodigosPostalesOrigen', []);
                }
            } catch (error) {
                cliente.error(error);
            }
        },
        async searchCpDestino({ commit }, payload) {
            try {
                if (payload !== '') {
                    let response = await cliente.searchCp(payload);
                    commit('setCodigosPostalesDestino', response);
                } else {
                    commit('setCodigosPostalesDestino', []);
                }
            } catch (error) {
                cliente.error(error);
            }
        },
        /**
         * 
         * to do traer mercancias
         */
        async getMercanciasCotizacion({ commit, rootState }, payload) {
            try {
                let mercancias = await mercancia.findAllCotizacion(payload);
                store.commit('tripModule/setMercancias', mercancias);
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async postMercanciaCotizacion({ dispatch, state, commit }, payload) {
            try {
                payload.tipo = 'cotizacion';
                payload.cotizacion = state.cotizacion.id;

                let response = await mercancia.create(payload);
                mercancia.success(response.msg);
                state.mercancia = new Mercancia();
                dispatch('getMercanciasCotizacion', payload.cotizacion);
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async deleteMercanciaCotizacion({ dispatch, state }, payload) {
            try {
                let response = await mercancia.delete(payload);
                mercancia.success(response.msg);
                dispatch('getMercanciasCotizacion', state.cotizacion.id);
            } catch (error) {
                cotizacion.error(error);
            }
        },
        async uploadMercanciasFromFileCotizacion({ dispatch, state }, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    payload.append('cotizacion', state.cotizacion.id);
                    payload.append('tipo', 'cotizacion');
                    let response = await cotizacion.upladMercanciasFromFile(payload);
                    cotizacion.success(response.msg);
                    dispatch('getMercanciasCotizacion', state.cotizacion.id);
                    resolve();
                } catch (error) {
                    cotizacion.error(error);
                    reject();
                }
            });
        },
        async deleteAllMercanciasCotizacion({ state, dispatch }, payload) {
            try {
                let response = await cotizacion.deleteMercanciasCotizacion(payload);
                cotizacion.success(response.msg);
                dispatch('getMercanciasCotizacion', state.cotizacion.id);
            } catch (error) {
                cotizacion.error(error);
            }
        }
    }
}

export default cotizacionModule;

