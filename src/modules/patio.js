import router from '../router';
import Patio from '../classes/patio'
import store from '../store'

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
            console.log(patio);
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
                let response = await patio.findAll();
                commit('setPatios', response);
            } catch (error) {
                patio.error(error);
            }
        },
        async getPatio({commit}, id) {
            try {
                let response = await patio.findById(id);
                commit('setPatio', response);
            } catch (error) {
                patio.error(error);
            }
        },
        async getPatioTrip({commit}, payload) {
            try {
                let response = await patio.findById(payload.id);
                commit('setPatioTrip', { patio: response, tipo: payload.tipo });
            } catch (error) {
                patio.error(error);
            }
        },
        async postPatio({ dispatch, state }, payload) {
            try {
                let response = await patio.create(payload);
                patio.success(response.msg);
                router.push('/patio');
                state.patio = new Patio();
                dispatch('getPatios');
            } catch (error) {
                patio.error(error);
            }
        },
        async putPatio({ dispatch }, payload) {
            try {
                let response = await patio.update(payload);
                patio.success(response.msg);
                router.push('/patio');
                dispatch('getPatios');
            } catch (error) {
                patio.error(error);
            }
        },
        async deletePatio({ dispatch }, id) {
            try {
                let response = await patio.delete(id);
                patio.success(response.msg);
                router.push('/patio');
                dispatch('getPatios');
            } catch (error) {
                patio.error(error);
            }
        }
    }
}

export default patioModule;