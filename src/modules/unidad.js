import router from '../router';
import Unidad from '../classes/unidad';
import store from '../store'
import { configuracion } from '../services/datos';
import { url } from '../services/url';
import { messages } from '../classes/messages'
import token from '../services/token';
import axios from 'axios';

let unidad = new Unidad();

const unidadModule = {
    namespaced: true,
    state: () =>({
        unidad,
        unidades: [],
        copia: [],
        configuracion
    }),
    mutations: {
        setUnidades(state, unidades) {
            state.unidades = unidades;
            state.copia = unidades;
        },
        setUnidad(state, unidad) {
            state.unidad = unidad;
            store.commit('tripModule/setUnidad', unidad);
        },
        searchUnidad(state, numero_economico) {
            let arry = [];
            if(numero_economico !== '') {
                state.copia.filter(x => {
                    console.log();
                    if (x.numero_economico.toUpperCase().indexOf(numero_economico.toUpperCase()) > -1) {
                        arry.push(x);
                    }
                });

                state.unidades = arry;
            } else {
                state.unidades = state.copia;
            }
        }
    },
    actions: {
        async getUnidades({commit}) {
            try {
                const { data } = await axios.get(`${url}/unidad`, token());
                commit('setUnidades', data);
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async getUnidad({ commit }, payload) {
            try {
                let { data } = await axios.get(`${url}/unidad/${payload}`, token());
                commit('setUnidad', data );
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async postUnidad({ dispatch, state}, payload) {
            try {
                const data = await axios.post(`${url}/unidad`, payload, token());
                messages.statusMessage(data);
                state.unidad = new Unidad();
                dispatch('getUnidades');
                router.push('/unidad');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async putUnidad({ dispatch }, payload) {
            try {
                const data = await axios.put(`${url}/unidad/${payload.id}`, payload, token());
                messages.statusMessage(data);
                dispatch('getUnidades');
                router.push('/unidad');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async deleteUnidad({ dispatch }, payload) {
            try {
                const responseQuestion = await messages.question();

                if (responseQuestion) {
                    const data = await axios.delete(`${url}/unidad/${payload}`, token());
                    messages.statusMessage(data);
                    dispatch('getUnidades');
                    router.push('/unidad');
                }
            } catch (error) {
                messages.statusMessage(error.response);
            }
        }
    }
}

export default unidadModule;