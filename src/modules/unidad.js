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
        copia: [],
        comfiguracion: [
            { clave: 'VL', descripcion: 'Vehículo ligero de carga(2 llantas en el eje delantero y 2 llantas en el eje trasero)'},
            { clave: 'C2', descripcion: 'Camión Unitario(2 llantas en el eje delantero y 4 llantas en el eje trasero)'},
            { clave: 'C3', descripcion: 'Camión Unitario(2 llantas en el eje delantero y 6 o 8 llantas en los dos ejes traseros)'},
            { clave: 'C2R2', descripcion: 'Camión - Remolque(6 llantas en el camión y 8 llantas en remolque)'},
            { clave: 'C3R2', descripcion: 'Camión - Remolque(10 llantas en el camión y 8 llantas en remolque)'},
            { clave: 'C2R3', descripcion: 'Camión - Remolque(6 llantas en el camión y 12 llantas en remolque)'},
            { clave: 'C3R3', descripcion: 'Camión - Remolque(10 llantas en el camión y 12 llantas en remolque)'},
            { clave: 'T2S1', descripcion: 'Tractocamión Articulado(6 llantas en el tractocamión, 4 llantas en el semirremolque)'},
            { clave: 'T2S2', descripcion: 'Tractocamión Articulado(6 llantas en el tractocamión, 8 llantas en el semirremolque)'},
            { clave: 'T2S3', descripcion: 'Tractocamión Articulado(6 llantas en el tractocamión, 12 llantas en el semirremolque)'},
            { clave: 'T3S1', descripcion: 'Tractocamión Articulado(10 llantas en el tractocamión, 4 llantas en el semirremolque)'},
            { clave: 'T3S2', descripcion: 'Tractocamión Articulado(10 llantas en el tractocamión, 8 llantas en el semirremolque)'},
            { clave: 'T3S3', descripcion: 'Tractocamión Articulado(10 llantas en el tractocamión, 12 llantas en el semirremolque)'},
            { clave: 'T2S1R2', descripcion:	'Tractocamión Semirremolque - Remolque(6 llantas en el tractocamión, 4 llantas en el semirremolque y 8 llantas en el remolque)'},
            { clave: 'T2S2R2', descripcion:	'Tractocamión Semirremolque - Remolque(6 llantas en el tractocamión, 8 llantas en el semirremolque y 8 llantas en el remolque)'},
            { clave: 'T2S1R3', descripcion:	'Tractocamión Semirremolque - Remolque(6 llantas en el tractocamión, 4 llantas en el semirremolque y 12 llantas en el remolque)'},
            { clave: 'T3S1R2', descripcion:	'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 4 llantas en el semirremolque y 8 llantas en el remolque)'},
            { clave: 'T3S1R3', descripcion:	'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 4 llantas en el semirremolque y 12 llantas en el remolque)'},
            { clave: 'T3S2R2', descripcion:	'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 8 llantas en el semirremolque y 8 llantas en el remolque)'},
            { clave: 'T3S2R3', descripcion:	'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 8 llantas en el semirremolque y 12 llantas en el remolque)'},
            { clave: 'T3S2R4', descripcion:	'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 8 llantas en el semirremolque y 16 llantas en el remolque)'},
            { clave: 'T2S2S2', descripcion:	'Tractocamión Semirremolque - Semirremolque(6 llantas en el tractocamión, 8 llantas en el semirremolque delantero y 8 llantas en el semirremolque trasero)'},
            { clave: 'T3S2S2', descripcion:	'Tractocamión Semirremolque - Semirremolque(10 llantas en el tractocamión, 8 llantas en el semirremolque delantero y 8 llantas en el semirremolque trasero)'},
            { clave: 'T3S3S2', descripcion:	'Tractocamión Semirremolque - Semirremolque(10 llantas en el tractocamión, 12 llantas en el semirremolque delantero y 8 llantas en el semirremolque trasero)'},
            { clave: 'OTROEVGP', descripcion: 'Especializado de carga Voluminosa y / o Gran Peso'},
            { clave: 'OTROSG', descripcion:	'Servicio de Grúas'},
            { clave: 'GPLUTA', descripcion:	'Grúa de Pluma Tipo A'},
            { clave: 'GPLUTB', descripcion:	'Grúa de Pluma Tipo B'},
            { clave: 'GPLUTC', descripcion:	'Grúa de Pluma Tipo C'},
            { clave: 'GPLUTD', descripcion:	'Grúa de Pluma Tipo D'},
            { clave: 'GPLATA', descripcion:	'Grúa de Plataforma Tipo A'},
            { clave: 'GPLATB', descripcion:	'Grúa de Plataforma Tipo B'},
            { clave: 'GPLATC', descripcion:	'Grúa de Plataforma Tipo C'},
            { clave: 'GPLATD', descripcion:	'Grúa de Plataforma Tipo D'},

        ]
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
                // unidad.error(error);
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