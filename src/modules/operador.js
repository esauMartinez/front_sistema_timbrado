import router from '../router';

import Operador from '../classes/operador';

let operador = new Operador();

const operadorModule = {
    namespaced: true,
    state: () => ({
        operador,
        operadores: [],
        copia: [],
        method: 'post',
    }),
    mutations: {
        setOperador(state, operador) {
            state.operador = operador.operador;
            state.method = operador.method;
            router.push('/form-operador');
        },
        setOperadores(state, operadores) {
            state.operadores = operadores;
            state.copia = operadores;
        },
        searchOperaor(state, operador) {
            let array = [];
            if(operador !== ''){
                state.copia.filter(x => {
                    let nombreCompleto = x.nombre + ' ' + x.materno + ' ' + x.paterno;
                    if(nombreCompleto.toUperCase().indexOf(operador.toUpperCase()) > -1){
                        array.push(x);
                    }
                });
                state.operadores = array;
            } else {
                state.operadores = state.copia;
            }
        }       
    },
    actions: {
        async getOperadores({ commit }) {
            try {
            let response = await operador.findAll();
            commit('setOperadores', operadores);
            } catch (error) {
                operador.error(error);
            }
        },
        async getOperador({ commit }, id) {
            try{
                let response = await operador.findById(id);
                commit('setOperador', {operador : response, method: 'put'});
            } catch (error) {
                operador.error(error);
            }
        },
        async postOperador({ dispatch, state }, payload) {
            try {
                let response = await operador.create(payload);
                operador.success(response.msg);
                if(response.status === 200){
                    router.push('/operador');
                    state.operador = new Operador();
                    dispatch('getOperadores');
                }
            } catch {
                operador.error(error);
            }
        },
        async putOperador({ dispatch, state }, payload) {
            try {
                let response = await operador.update(payload);
                operador.success(response.msg);
                router.push('/operador');
                dispatch('getOperadores');

                state.operador = new Operador();
                state.method = 'post';
            } catch {
                operador.error(error);
            }
        },
        async deleteOperador({ dispatch }, id) {
            try {
                let response = await operador.delete(id);
                operador.success(response.msg);
                dispatch('getOperadores');
            } catch {
                operador.error(error);
            }
        }
    }
}

export default operadorModule;