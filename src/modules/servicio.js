import router from '../router'
import store from '../store'
import Servicio from '../classes/servicio'
import axios from 'axios'
import { url } from '../services/url'
import token from '../services/token'
import { messages } from '../classes/messages'

let servicio = new Servicio()

const servicioModule = {
    namespaced: true,
    state: () => ({
       servicio,
       servicios: []
    }),
    mutations: {
        setServicios(state, data) {
            state.servicios = data;
        },
        setServicio(state, data) {
            state.servicio = data;
        }
    },
    actions: {
        async getServicios({ commit }) {
            try {
                const { data } = await axios.get(`${url}/servicio`, token());
                commit('setServicios', data);
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async getServicio({ commit }, payload) {
            try {
                const { data } = await axios.get(`${url}/servicio/${payload}`, token());
                commit('setServicio', data);
            } catch (error) {
                router.push('/root');
                messages.statusMessage(error.response);
            }
        },
        async postServicio({ dispatch, state }, payload) {
            try {
                const data = await axios.post(`${url}/servicio`, payload, token());
                messages.statusMessage(data)
                state.servicio = new Servicio();
                dispatch('getServicios');
                router.push('/servicio');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async deleteServicio({ dispatch }, payload) {
            try {
                const responseQuestion = await messages.question();

                if (responseQuestion) { 
                    const data = await axios.delete(`${url}/servicio/${payload}`, token());
                    messages.statusMessage(data)
                    dispatch('getServicios');
                    router.push('/servicio');
                }
            } catch (error) {
                messages.statusMessage(error.response);
            }
        }
    }
}

export default servicioModule;