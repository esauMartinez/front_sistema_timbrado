import router from '../router'
import store from '../store'
import Servicio from '../classes/servicio'

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
                let response = await servicio.findAll();
                commit('setServicios', response);
            } catch (error) {
                servicio.error(error);
            }
        },
        async getServicio({ commit }, payload) {
            try {
                let response = await servicio.findById(payload);
                commit('setServicio', response);
            } catch (error) {
                router.push('/root');
                servicio.error(error);
            }
        },
        async postServicio({ dispatch, state }, payload) {
            try {
                let response = await servicio.create(payload);
                servicio.success(response.msg);
                router.push('/servicio');
                state.servicio = new Servicio();
                dispatch('getServicios');
            } catch (error) {
                servicio.error(error);
            }
        },
        async deleteServicio({ dispatch }, id) {
            try {
                let response = await servicio.delete(id);
                servicio.success(response.msg);
                router.push('/servicio');
                dispatch('getServicios');
            } catch (error) {
                servicio.error(error);
            }
        }
    }
}

export default servicioModule;