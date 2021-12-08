import Trip from '../classes/trip';
import Empresa from '../classes/empresa'
import router from '../router';

let empresa = new Empresa();

const empresaModule = {
    namespaced: true,
    state: () => ({
        empresa,
        empresas: []
    }),
    mutations: {
        setEmpresas(state, empresas) {
            state.empresas = empresas;
        },
        setEmpresa(state, empresa) {
            state.empresa = empresa;
        }
    },
    actions: {
        async getEmpresas({ commit }) {
            try {
                let response = await empresa.findAll();
                commit('setEmpresas', response);
            } catch (error) {
                empresa.error(error);
            }
        },
        async getEmpresa({ commit }, payload) {
            try {
                let response = await empresa.findById(payload);
                commit('setEmpresa', response);
            } catch (error) {
                router.push('/root');
                empresa.error(error);
            }
        },
        async postEmpresa({ dispatch, state }, payload) {
            try {
                let response = await empresa.create(payload);
                empresa.success(response.msg);
                router.push('/root');
                state.empresa = new Empresa();
                dispatch('getEmpresas');
            } catch (error) {
                empresa.error(error);
            }
        },
        async putEmpresa({ dispatch }, payload) {
            try {
                let response = await empresa.update(payload);
                empresa.success(response.msg);
                router.push('/root');
                dispatch('getEmpresas');
            } catch (error) {
                empresa.error(error);
            }
        },
    }
}

export default empresaModule;

