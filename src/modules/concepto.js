import Trip from '../classes/trip';
import Concepto from '../classes/concepto'
import router from '../router';

const concepto = new Concepto();

const conceptoModule = {
    namespaced: true,
    state: () => ({
        concepto,
        conceptos: [],
        modal_concepto: false
    }),
    mutations: {
        setConceptos(state, conceptos) {
            state.conceptos = conceptos;
        },
        setTipoConcepto(state, tipo) {
            state.concepto.tipo = tipo.tipo;
            state.concepto.clave = tipo.clave
        },
        showModalConcepto(state) {
            state.modal_concepto = !state.modal_concepto;
        },
        setConcepto(state, payload) {
            state.concepto.concepto = payload.descripcion;
            state.concepto.clave_concepto = payload.clave;
        }
    },
    actions: {
        async getConceptos({ commit }, payload) {
            try {
                let response = await concepto.findAll(payload);
                commit('setConceptos', response);
            } catch (error) {
                concepto.error(error);
            }
        },
        async postConcepto({ dispatch, state }, payload) {
            try {
                let response = await concepto.create(payload);
                concepto.success(response.msg);
                state.concepto = new Concepto();
                dispatch('getConceptos', payload.clave);
            } catch (error) {
                concepto.error(error);
            }
        },
        async deleteConcepto({ dispatch, rootState }, payload) {
            try {
                let response = await concepto.delete(payload);
                concepto.success(response.msg);
                dispatch('getConceptos', rootState.tripModule.trip.id);
            } catch (error) {
                concepto.error(error);
            }
        }
    },
    getters: {
        calcularCosto(state, rootState) {
            let total = 0;
            
            state.conceptos.map(x => {
                let iva = (x.iva / 100) * x.monto;
                let retencion = (x.retencion / 100) * x.monto;
                total += parseFloat(x.monto) + parseFloat(iva) - parseFloat(retencion);
            });

            return total;
        },
        calcularTotal(state, rootState) {
            let total = 0;

            state.conceptos.map(x => {
                let iva = (x.iva / 100) * x.monto;
                let retencion = (x.retencion / 100) * x.monto;
                total += parseFloat(x.monto) + parseFloat(iva) - parseFloat(retencion);
            });

            return total;
        },
        calcularSubtotal(state) {
            let subtotal = 0;

            state.conceptos.map(x => {
                subtotal += parseFloat(x.monto);
            });

            return subtotal;
        },
        calcularIVA(state) {
            let iva = 0;

            state.conceptos.map(x => {
                iva += (x.iva / 100) * parseFloat(x.monto);
            });

            return iva;
        },
        calcularRetencion(state) {
            let retencion = 0;

            state.conceptos.map(x => {
                retencion += (x.retencion / 100) * parseFloat(x.monto);
            });

            return retencion;
        }
    }
}

export default conceptoModule;

