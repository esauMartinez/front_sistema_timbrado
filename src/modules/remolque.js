import router from '../router'
import Remolque from '../classes/remolque'
import store from '../store'

let remolque = new Remolque()

const remolqueModule = {
    namespaced: true,
    state: () => ({
        remolque,
        remolques: [],
        copia: []
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
                let response = await remolque.findAll();
                commit('setRemolques', response);
            } catch (error) { 
                remolque.error(error);
            }
        },
        async getRemolque({ commit }, id) {
            try{
                let response = await remolque.findById(id);
                commit('setRemolque', response);
            } catch (error) {
                remolque.error(error);
            }
        },
        async postRemolque( { dispatch, state }, payload){
            try {
                let response = await remolque.create(payload);
                remolque.success(response.msg);
                router.push('/remolque');
                state.remolque = new Remolque();
                dispatch('getRemolques');
            } catch (error) {
                remolque.error(error);
            }
        },
        async putRemolque({ dispatch }, payload){
            try {
                let response = await remolque.update(payload);
                remolque.success(response.msg);
                router.push('/remolque');
                dispatch('getRemolques');
            } catch(error) {
                remolque.error(error);
            }
        },
        async deleteRemolque({ dispatch }, id){
            try{
                let response = await remolque.delete(id);
                remolque.success(response.msg);
                dispatch('getRemolques');
            } catch (error) {
                remolque.error(error);
            }
        }
    }
}

export default remolqueModule;