import router from '../router';
import Patio from '../classes/patio'
import store from '../store'
import axios from 'axios';
import { url } from '../services/url';
import token from '../services/token';
import { messages } from '../classes/messages';

let patio = new Patio();

const patioModule = {
    namespaced: true,
    state: () => ({
        patio,
        patios: [],
        copia: []
    }),
    mutations: {
        setPatios(state, patios) {
            state.patios = patios;
            state.copia = patios;
        },
        setPatio(state, patio) {
            state.patio = patio;
        },
        setPatioTrip(state, patio) {
            if (patio.tipo === 'origen') {
                store.commit('tripModule/setOrigen', patio.patio);
            } else {
                store.commit('tripModule/setDestino', patio.patio);
            }
        },
        searchPatio(state, nombre) {
            let array = [];
            if(nombre !== '') {
                state.copia.filter(x => {
                    if(x.nombre.toUpperCase().indexOf(nombre.toUpperCase()) > -1) {
                        array.push(x);
                    }
                });
                state.patios = array;
            } else {
                state.patios = state.copia;
            }
        },
        setCodigoPostal(state, postal) {
            state.patio.colonia = postal.d_asenta;
            state.patio.c_colonia = postal.id_asenta_cpcons;
            state.patio.municipio = postal.D_mnpio;
            state.patio.c_municipio = postal.c_mnpio;
            state.patio.estado = postal.d_estado;
            state.patio.c_estado = postal.abreviatura_estado;
            state.patio.pais = postal.pais;
            state.patio.c_pais = postal.abreviatura_pais;
            state.patio.localidad = postal.c_cve_ciudad;
            this.state.postalModule.codigos = [];
        }
    },
    actions: {
        async getPatios({commit}) {
            try {
                const { data } = await axios.get(`${url}/patio`, token());
                commit('setPatios', data);
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async getPatio({commit}, payload) {
            try {
                const { data } = await axios.get(`${url}/patio/${payload}`, token());
                commit('setPatio', data);
            } catch (error) {
                // messages.statusMessage(error.response);
            }
        },
        async getPatioTrip({commit}, payload) {
            try {
                const { data } = await axios.get(`${url}/patio/${payload.id}`, token());
                commit('setPatioTrip', { patio: data, tipo: payload.tipo });
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async postPatio({ dispatch, state }, payload) {
            try {
                const data = await axios.post(`${url}/patio`, payload, token());
                messages.statusMessage(data);
                state.patio = new Patio();
                dispatch('getPatios');
                router.push('/patio');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async putPatio({ dispatch }, payload) {
            try {
                const data = await axios.put(`${url}/patio/${payload.id}`, payload, token());
                messages.statusMessage(data);
                router.push('/patio');
                dispatch('getPatios');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async deletePatio({ dispatch }, payload) {
            try {
                const responseQuestion = await messages.question();

                if (responseQuestion) {
                    const data = await axios.delete(`${url}/patio/${payload}`, token());
                    messages.statusMessage(data);
                    dispatch('getPatios');
                    router.push('/patio');
                }
            } catch (error) {
                messages.statusMessage(error.response);
            }
        }
    }
}

export default patioModule;