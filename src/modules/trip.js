import Trip from '../classes/trip';
import router from '../router';

let trip = new Trip();

const tripModule = {
    namespaced: true,
    state: () => ({
        trip,
        trips: [],
        clientes: [],
        operadores: [],
        modal: false
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
        async getTrip({ commit }, payload) {
            try {
                let data = await trip.findTripById(payload);
                commit('setTrip', data);
            } catch (error) {
                trip.error(error);
            }
        },
        async postTrip({ state, dispatch }, payload) {
            try {
                let response =await trip.create(payload);
                trip.success(response.msg);
                state.trip = new Trip();
                dispatch('getTrips');
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
        async getMercancias() {
            try {
                let mercancias = await trip.findMercanciasTrip(1);
                console.log(mercancias);
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
        }
    }
}

export default tripModule;

