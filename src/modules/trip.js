import Trip from '../classes/trip';
import Mercancia from '../classes/mercancia'
import router from '../router';

let trip = new Trip();
let mercancia = new Mercancia();

const tripModule = {
    namespaced: true,
    state: () => ({
        trip,
        mercancia,
        trips: [],
        clientes: [],
        operadores: [],
        modal: false,
        mercancias: []
    }),
    mutations: {
        setTrips(state, trips) {
            console.log(trips);
            state.trips = trips;
        },
        setTrip(state, trip) {
            console.log(trip);
            state.trip = trip;
        },
        setClientes(state, clientes) {
            state.clientes = clientes;
        },
        setCliente(state, cliente) {
            state.trip.cliente = cliente.id;
            state.trip.nombre_cliente = `${cliente.razon_social}`
            state.clientes = [];
        },
        setOperadores(state, operadores) {
            state.operadores = operadores;
        },
        setOperador(state, operador) {
            state.trip.operador = operador.id;
            state.trip.nombre_operador = `${operador.nombre} ${operador.paterno} ${operador.materno}`
            state.operadores = [];
        },
        showModal(state) {
            state.modal = !state.modal;
        },
        setMercancias(state, mercancias) {
            state.mercancias = mercancias;
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

                dispatch('getMercancias', payload)
            } catch (error) {
                trip.error(error);
            }
        },
        async postTrip({ state, dispatch }) {
            try {
                let response = await trip.create();
                trip.success(response.msg);
                state.trip = new Trip();
                dispatch('getTrips', 'creado');
                router.push('/trip');
            } catch (error) {
                trip.error(error);
            }
        },
        async putTrip({ state, dispatch }, payload) {
            try {
                let response = await trip.update(payload);
                trip.success(response.msg);
                state.trip = new Trip();
                dispatch('getTrips');
                router.push('/trip');
            } catch (error) {
                trip.error(error);
            }
        },
        async updateStatus({ state, dispatch }, payload) {
            console.log(payload);
            try {
                let response = await trip.updateStatus(payload);
                trip.success(response.msg);
                state.trip = new Trip();
                dispatch('getTrips');
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
        }
    }
}

export default tripModule;

