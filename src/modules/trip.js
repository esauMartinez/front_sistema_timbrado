import Trip from '../classes/trip';
import Mercancia from '../classes/mercancia'
import router from '../router';
import store from '../store';
import moment from 'moment';

let trip = new Trip();
let mercancia = new Mercancia();

const tripModule = {
    namespaced: true,
    state: () => ({
        trip,
        mercancia,
        estatusTrip: 'creado',
        trips: [],
        clientes: [],
        operadores: [],
        modal: false,
        mercancias: [],
        productos: [],
        unidadesMedida: [],
        tableName: '',
        modalTables: false
    }),
    mutations: {
        setEstatus(state, estatus) {
            state.estatusTrip = estatus;
        },
        setTrips(state, trips) {
            trips.forEach(item => {
                if (item.tipo === 'cotizacion') {
                    item.nombre_cliente = item.cliente_cotizacion;
                    item.origen = item.origen_nombre;
                    item.destino = item.destino_nombre;            
                }
            });

            state.trips = trips;
        },
        setTrip(state, trip) {
            console.log(trip);
            if (trip.tipo === 'cotizacion') {
                state.trip.cliente = trip.cliente_id_cotizacion;
                state.trip.nombre_cliente = trip.cliente_nombre_cotizacion;

                state.trip.nombre_origen = trip.origen_nombre;
                state.trip.origen_codigo_postal = trip.origen_codigo_postal;
                state.trip.origen_colonia = trip.origen_colonia;
                state.trip.origen_municipio = trip.origen_municipio;
                state.trip.origen_estado = trip.origen_estado;
                state.trip.origen_pais = trip.origen_pais;
                state.trip.origen_exterior = trip.origen_exterior;

                state.trip.nombre_destino = trip.destino_nombre;
                state.trip.destino_codigo_postal = trip.destino_codigo_postal;
                state.trip.destino_colonia = trip.destino_colonia;
                state.trip.destino_municipio = trip.destino_municipio;
                state.trip.destino_estado = trip.destino_estado;
                state.trip.destino_pais = trip.destino_pais;
                state.trip.destino_exterior = trip.destino_exterior;
                state.trip.moneda = trip.cotizacion_moneda;
                state.trip.tipo_viaje = trip.cotizacion_tipo_viaje;
                state.trip.forma_pago = trip.cotizacion_forma_pago;
                state.trip.metodo_pago = trip.cotizacion_metodo_pago;
                state.trip.uso_CFDI = trip.cotizacion_uso_CFDI;
                store.state.conceptoModule.concepto.cotizacion = (trip.numero_cotizacion === 0) ? null : trip.numero_cotizacion;
            } else {
                state.trip.cliente = trip.cliente;
                state.trip.nombre_cliente = trip.nombre_cliente;

                state.trip.origen = trip.clave_origen;
                state.trip.nombre_origen = trip.patio_origen;

                state.trip.destino = trip.clave_destino;
                state.trip.nombre_destino = trip.patio_destino;
                state.trip.moneda = trip.moneda;
                state.trip.tipo_viaje = trip.tipo_viaje;
                state.trip.uso_CFDI = trip.uso_CFDI;
                state.trip.metodo_pago = trip.metodo_pago;
                state.trip.forma_pago = trip.forma_pago;
                store.state.conceptoModule.concepto.trip = trip.id;
            }
            state.trip.id = trip.id;
            state.trip.operador = trip.operador;
            state.trip.remolque = trip.remolque;
            state.trip.numero_economico_remolque = trip.numero_remolque;
            state.trip.unidad = trip.unidad;
            state.trip.numero_economico_unidad = trip.numero_unidad;
            state.trip.estatus = trip.estatus;
            state.trip.tipo = trip.tipo;
            state.trip.fecha_salida = moment(trip.fecha_llegada).format('YYYY-MM-DDThh:mm:ss');
            state.trip.fecha_llegada = moment(trip.fecha_llegada).format('YYYY-MM-DDThh:mm:ss');
            state.trip.kilometros = trip.kilometros;
            
            state.trip.nombre_operador = (trip.nombre_operador !== null) ? `${trip.nombre_operador} ${trip.paterno} ${trip.materno}` : '';
        },
        setModalTables(state) {
            state.modalTables = false;
            trip.setBody();
        },
        setClientes(state, clientes) {
            state.clientes = clientes;
        },
        setCliente(state, cliente) {
            state.trip.cliente = cliente.id;
            state.trip.nombre_cliente = `${cliente.razon_social}`
            state.trip.uso_CFDI = cliente.uso_CFDI;
            state.trip.metodo_pago = cliente.metodo_pago;
            state.trip.forma_pago = cliente.forma_pago;
            state.clientes = [];
            state.modalTables = !state.modalTables;
            trip.setBody();
        },
        setOperadores(state, operadores) {
            let arrayFilterOperadores = [];
            operadores.map(x => {
                if (x.estatus) {
                    arrayFilterOperadores.push(x);
                }
            });

            state.operadores = arrayFilterOperadores;
        },
        setOperador(state, operador) {
            state.trip.operador = operador.id;
            state.trip.nombre_operador = `${operador.nombre} ${operador.paterno} ${operador.materno}`
            state.operadores = [];
            state.modalTables = !state.modalTables;
            trip.setBody();
        },
        setRemolque(state, remolque) {
            state.trip.remolque = remolque.id;
            state.trip.numero_economico_remolque = remolque.numero_economico;
            state.modalTables = !state.modalTables;
            trip.setBody();
        },
        setUnidad(state, unidad) {
            state.trip.unidad = unidad.id;
            state.trip.numero_economico_unidad = unidad.numero_economico;
            state.modalTables = !state.modalTables;
            trip.setBody();
        },
        setOrigen(state, patio) {
            state.trip.origen = patio.id;
            state.trip.nombre_origen = patio.nombre;
            state.modalTables = !state.modalTables;
            trip.setBody();
        },
        setDestino(state, patio) {
            state.trip.destino = patio.id;
            state.trip.nombre_destino = patio.nombre;
            state.modalTables = !state.modalTables;
            trip.setBody();
        },
        showModal(state) {
            state.modal = !state.modal;
        },
        showModalTable(state, payload) {
            state.tableName = payload;
            state.modalTables = !state.modalTables;
        },
        setMercancias(state, mercancias) {
            state.mercancias = mercancias;
        },
        setProductos(state, productos) {
            state.productos = productos;
        },
        setProducto(state, producto) {
            state.mercancia.producto = `${producto.clave_STCC}-${producto.descripcion}`;
            state.mercancia.claveProducto = producto.clave_STCC;
            state.mercancia.materialPeligroso = producto.material_peligroso;

            console.log(state.mercancia);

            state.productos = [];
        },
        setUnidadesMedida(state, unidadesMedida) {
            state.unidadesMedida = unidadesMedida;
        },
        setUnidadMedida(state, unidadMedida) {
            state.mercancia.unidadMedida = `${unidadMedida.claveUnidad}-${unidadMedida.nombre}`;
            state.mercancia.claveUnidadMedida = unidadMedida.claveUnidad;
            state.unidadesMedida = [];
        }
    },
    actions: {
        async getTrips({ commit }, payload) {
            try {
                let trips = await trip.findAllTrips(payload);
                commit('setTrips', trips);
            } catch (error) {
                trip.error(error);
            }
        },
        async getTrip({ commit, dispatch }, payload) {
            try {
                let data = await trip.findTripById(payload);
                commit('setTrip', data);

                if (data.tipo === 'trip') {
                    dispatch('getMercancias', payload)
                    store.dispatch('conceptoModule/getConceptos', payload);
                } else {
                    store.dispatch('conceptoModule/getConceptos', data.numero_cotizacion);
                    store.dispatch('cotizacionModule/getMercanciasCotizacion', data.numero_cotizacion);
                }

            } catch (error) {
                trip.error(error);
            }
        },
        async postTrip({ state, dispatch }) {
            try {
                let response = await trip.create();
                trip.success(response.msg);
                state.trip = new Trip();
                dispatch('getTrips', state.estatusTrip);
                router.push('/trip');
            } catch (error) {
                trip.error(error);
            }
        },
        async putTrip({ state, dispatch }, payload) {
            try {
                await trip.update(payload);
                state.trip = new Trip();
                dispatch('getTrips', state.estatusTrip);
                console.log(response);
                
                router.push('/trip');
            } catch (error) {

                if (error.response.status === 404) {
                    trip.notFound(error.response.data.msg);
                } else if (error.response.status === 400) {
                    console.log(error.response.data);
                    trip.error(error.response.data.msg.message);
                } else {
                    trip.error(error);
                }
            }
        },
        async updateStatus({ state, dispatch }, payload) {
            try {
                let response = await trip.updateStatus(payload);
                trip.success(response.msg);
                state.trip = new Trip();
                dispatch('getTrips', payload.estatus);
                router.push('/trip');
            } catch (error) {
                trip.error(error);
            }
        },
        async getCliente({ commit }, payload) {
            try {
                if (payload !== '') {
                    let clientes = await trip.findCliente(payload);
                    commit('setClientes', clientes);
                } else {
                    commit('setClientes', []);
                }
            } catch (error) {
                trip.error(error);
            }
        },
        async getOperador({ commit }, payload) {
            try {
                if (payload !== '') {
                    let operadores = await trip.findOperador(payload);
                    commit('setOperadores', operadores);
                } else {
                    commit('setOperadores', []);
                }
            } catch (error) {
                trip.error(error);
            }        
        },
        async getMercancias({ commit }, payload) {
            try {
                let mercancias = await mercancia.findAll(payload);
                commit('setMercancias', mercancias);
            } catch (error) {
                trip.error(error);
            }
        },
        async postMercancia({ dispatch, state, commit }, payload) {
            try {
                payload.tipo = 'trip';
                payload.trip = state.trip.id;

                let response = await mercancia.create(payload);
                mercancia.success(response.msg);
                state.mercancia = new Mercancia();
                dispatch('getMercancias', payload.trip);
            } catch (error) {
                trip.error(error);
            }
        },
        async deleteMercancia({ dispatch, state }, payload) {
            try {
                let response = await mercancia.delete(payload);
                mercancia.success(response.msg);
                dispatch('getMercancias', state.trip.id);
            } catch (error) {
                trip.error(error);
            }
        },
        async searchProducto({ commit }, payload) {
            try {
                if (payload !== '') { 
                    let response = await mercancia.findProducto(payload);
                    commit('setProductos', response);
                } else {
                    commit('setProductos', []);
                }
            } catch (error) {
                trip.error(error);
            }
        },
        async searchUnidadMedida({ commit }, payload) {
            try {
                if (payload !== '') { 
                    let response = await mercancia.findUnidadMedida(payload);
                    commit('setUnidadesMedida', response);
                } else {
                    commit('setUnidadesMedida', []);
                }
            } catch (error) {
                trip.error(error);
            }
        }
    }
}

export default tripModule;

