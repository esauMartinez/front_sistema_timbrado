import Cliente from '../classes/cliente'
let cliente = new Cliente();


const postalModule = {
    namespaced: true,
    state: () => ({
        codigos: []
    }),
    mutations: {
        setCodigosPostales(state, codigos) {
            state.codigos = codigos;
        }
    },
    actions: {
        async searchCp({ commit }, payload) {
            try {
                if (payload !== '') {
                    let response = await cliente.searchCp(payload);
                    commit('setCodigosPostales', response);
                } else {
                    commit('setCodigosPostales', []);
                }
            } catch (error) {
                cliente.error(error);
            }
        }
    }
}

export default postalModule;

