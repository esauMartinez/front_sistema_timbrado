import router from '../router'
import Operador from '../classes/operador'
import store from '../store'
import token from '../services/token'
import axios from 'axios'
import { messages } from '../classes/messages'
import { url } from '../services/url'

let operador = new Operador()

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
            store.commit('tripModule/setOperador', operador);
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
        }
    },
    actions: {
        async getOperadores({ commit }) {
            try {
                const { data } = await axios.get(`${url}/operador`, token());
                commit('setOperadores', data);
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async getOperador({ commit }, payload) {
            try {
                let { data } = await axios.get(`${url}/operador/${payload}`, token());
                commit('setOperador', data);
            } catch (error) {
                // operador.error(error);
            }
        },
        async postOperador({ dispatch, state }, payload) {
            try {
                const data = await axios.post(`${url}/operador`, payload, token());
                messages.statusMessage(data);
                state.operador = new Operador();
                dispatch('getOperadores');
                router.push('/operador');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async putOperador({ dispatch }, payload) {
            try {
                const data = await axios.put(`${url}/operador/${payload.id}`, payload, token());
                messages.statusMessage(data);
                dispatch('getOperadores');
                router.push('/operador');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async deleteOperador({ dispatch }, payload) {
            try {
                const responseQuestion = await messages.question();
                
                if (responseQuestion) {
                    const data = await axios.delete(`${url}/operador/${payload}`, token());
                    messages.statusMessage(data);
                    dispatch('getOperadores');
                }
            } catch (error) {
                messages.statusMessage(error.response);
            }
        }
    }
}

export default operadorModule;

