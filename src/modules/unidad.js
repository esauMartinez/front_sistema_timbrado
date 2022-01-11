import router from '../router';
import Unidad from '../classes/unidad';
import remolqueModule from './remolque';
import store from '../store'

let unidad = new Unidad();

const unidadModule = {
    namespaced: true,
    state: () =>({
        unidad,
        unidades: [],
        copia: []
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
                let response = await unidad.findAll();
                commit('setUnidades', response);
            } catch (error) {
                unidad.error(error);
            }
        },
        async getUnidad({ commit }, id) {
            try {
                let response = await unidad.findById(id);
                commit('setUnidad', response);
            } catch (error) {
                unidad.error(error);
            }
        },
        async postUnidad({ dispatch, state}, payload) {
            try {
                let response = await unidad.create(payload);
                unidad.success(response.msg);
                router.push('/unidad');
                state.unidad = new Unidad();
                dispatch('getUnidades');
            } catch (error) {
                unidad.error(error);
            }
        },
        async putUnidad({ dispatch }, payload) {
            try {
                let response = await unidad.update(payload);
                unidad.success(response.msg);
                router.push('/unidad');
                dispatch('getUnidades');
            } catch (error) {
                unidad.error(error);
            }
        },
        async deleteUnidad({ dispatch }, id) {
            try {
                let response = await unidad.delete(id);
                unidad.success(response.msg);
                router.push('/unidad');
                dispatch('getUnidades');
            } catch (error) {
                unidad.error(error);
            }
        }
    }
}

export default unidadModule;