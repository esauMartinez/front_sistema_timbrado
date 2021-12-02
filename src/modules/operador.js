import router from '../router';
import Operador from '../classes/operador'

let operador = new Operador();

const operadorModule = {
    namespaced: true,
    state: () => ({
        operador,
        operadores: [],
        copia: []
    }),
    mutations: {
        setOperadores(state, operadores) {
            state.operadores = operadores;
            state.copia = operadores;
        },
        setOperador(state, operador) {
            state.operador = operador;
        },
        searchOperador(state, nombre) {
            let array = [];
            if (nombre !== '') {
                state.copia.filter(x => {
                    if (x.nombre.toUpperCase().indexOf(nombre.toUpperCase()) > -1) {
                        array.push(x);
                    }
                });

                state.operadores = array;
            } else {
                state.operadores = state.copia;
            }
        },
        setCodigoPostal(state, postal) {
            state.operador.colonia = postal.d_asenta;
            state.operador.municipio = postal.D_mnpio;
            state.operador.estado = postal.d_estado;
            state.operador.pais = postal.pais;
            this.state.postalModule.codigos = [];

            console.log(postal);
        }
    },
    actions: {
        async getOperadores({ commit }) {
            try {
                let response = await operador.findAll();
                commit('setOperadores', response);
            } catch (error) {
                operador.error(error);
            }
        },
        async getOperador({ commit }, payload) {
            try {
                let response = await operador.findById(payload);
                commit('setOperador', response);
            } catch (error) {
                operador.error(error);
            }
        },
        async postOperador({ dispatch, state }, payload) {
            try {
                let response = await operador.create(payload);
                operador.success(response.msg);
                console.log('ruta a operador');
                router.push('/operador');
                state.operador = new Operador();
                dispatch('getOperadores');
            } catch (error) {
                operador.error(error);
            }
        },
        async putOperador({ dispatch }, payload) {
            try {
                let response = await operador.update(payload);
                operador.success(response.msg);
                router.push('/operador');
                dispatch('getOperadores');
            } catch (error) {
                operador.error(error);
            }
        },
        async deleteOperador({ dispatch }, payload) {
            try {
                let response = await operador.delete(payload);
                operador.success(response.msg);
                dispatch('getOperadores');
            } catch (error) {
                operador.error(error);
            }
        }
    }
}

export default operadorModule;

