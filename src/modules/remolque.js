import router from '../router'
import Remolque from '../classes/remolque'
import store from '../store'

let remolque = new Remolque()

const remolqueModule = {
    namespaced: true,
    state: () => ({
        remolque,
        remolques: [],
        copia: [],
        arr_subtipo: [
            { clave: 'CTR001', descripcion:	'Caballete' },
            { clave: 'CTR002', descripcion:	'Caja' },
            { clave: 'CTR003', descripcion:	'Caja Abierta' },
            { clave: 'CTR004', descripcion:	'Caja Cerrada' },
            { clave: 'CTR005', descripcion:	'Caja De Recolección Con Cargador Frontal' },
            { clave: 'CTR006', descripcion:	'Caja Refrigerada' },
            { clave: 'CTR007', descripcion:	'Caja Seca' },
            { clave: 'CTR008', descripcion:	'Caja Transferencia' },
            { clave: 'CTR009', descripcion:	'Cama Baja o Cuello Ganso' },
            { clave: 'CTR010', descripcion:	'Chasis Portacontenedor' },
            { clave: 'CTR011', descripcion:	'Convencional De Chasis' },
            { clave: 'CTR012', descripcion:	'Equipo Especial' },
            { clave: 'CTR013', descripcion:	'Estacas' },
            { clave: 'CTR014', descripcion:	'Góndola Madrina' },
            { clave: 'CTR015', descripcion:	'Grúa Industrial' },
            { clave: 'CTR016', descripcion:	'Grúa ' },
            { clave: 'CTR017', descripcion:	'Integral' },
            { clave: 'CTR018', descripcion:	'Jaula' },
            { clave: 'CTR019', descripcion:	'Media Redila' },
            { clave: 'CTR020', descripcion:	'Pallet o Celdillas' },
            { clave: 'CTR021', descripcion:	'Plataforma' },
            { clave: 'CTR022', descripcion:	'Plataforma Con Grúa' },
            { clave: 'CTR023', descripcion:	'Plataforma Encortinada' },
            { clave: 'CTR024', descripcion:	'Redilas' },
            { clave: 'CTR025', descripcion:	'Refrigerador' },
            { clave: 'CTR026', descripcion:	'Revolvedora' },
            { clave: 'CTR027', descripcion:	'Semicaja' },
            { clave: 'CTR028', descripcion:	'Tanque' },
            { clave: 'CTR029', descripcion:	'Tolva' },
            { clave: 'CTR031', descripcion:	'Volteo' },
            { clave: 'CTR032', descripcion:	'Volteo Desmontable' },

        ]
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
                // remolque.error(error);
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