import router from '../router'
import Remolque from '../classes/remolque'
import store from '../store'
import { arr_subtipo } from '../services/datos'
import { url } from '../services/url'
import axios from 'axios'
import token from '../services/token'
import { messages } from '../classes/messages'

let remolque = new Remolque()

const remolqueModule = {
    namespaced: true,
    state: () => ({
        remolque,
        remolques: [],
        copia: [],
        arr_subtipo
    }),
    mutations: {
        setRemolques(state, remolques) {
            state.remolques = remolques;
            state.copia = remolques;
        },
        setRemolque(state, remolque) {
            state.remolque = remolque;
            store.commit('tripModule/setRemolque', remolque);
        },
        searchRemolque(state, numero_economico) {
            let array = [];
            if(numero_economico !== ''){
                state.copia.filter(x => {
                    if(x.numero_economico.toUpperCase().indexOf(numero_economico.toUpperCase()) > -1){
                        array.push(x);
                    }
                });

                state.remolques = array;
            } else {
                state.remolques = state.copia;
            }
        }
    },
    actions: {
        async getRemolques({ commit }) {
            try {
                const { data } = await axios.get(`${url}/remolque`, token());
                commit('setRemolques', data);
            } catch (error) { 
                messages.statusMessage(error.response);
            }
        },
        async getRemolque({ commit }, payload) {
            try{
                let { data } = await axios.get(`${url}/remolque/${payload}`, token());
                commit('setRemolque', data);
            } catch (error) {
                // remolque.error(error);
            }
        },
        async postRemolque( { dispatch, state }, payload){
            try {
                const data = await axios.post(`${url}/remolque`, payload, token());
                messages.statusMessage(data);
                state.remolque = new Remolque();
                dispatch('getRemolques');
                router.push('/remolque');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async putRemolque({ dispatch }, payload){
            try {
                const data = await axios.put(`${url}/remolque/${payload.id}`, payload, token());
                messages.statusMessage(data);
                router.push('/remolque');
                dispatch('getRemolques');
            } catch(error) {
                messages.statusMessage(error.response);
            }
        },
        async deleteRemolque({ dispatch }, payload){
            try{
                const responseQuestion = await messages.question();

                if (responseQuestion) {
                    const data = await axios.delete(`${url}/remolque/${payload}`, token());
                    messages.statusMessage(data);
                    dispatch('getRemolques');
                }
            } catch (error) {
                messages.statusMessage(error.response);
            }
        }
    }
}

export default remolqueModule;