import router from '../router';
import Cliente from '../classes/cliente'
let cliente = new Cliente();

const clienteModule = {
    namespaced: true,
    state: () => ({
        cliente,
        clientes: [],
        copia: []
    }),
    mutations: {
        setClientes(state, clientes) {
            state.clientes = clientes;
            state.copia = clientes;
        },
        setCliente(state, cliente) {
            state.cliente = cliente;
        },
        searchCliente(state, razon_social) {
            let array = [];
            if (razon_social !== '') {
                state.copia.filter(x => {
                    if (x.razon_social.toUpperCase().indexOf(razon_social.toUpperCase()) > -1) {
                        array.push(x);
                    }
                });

                state.clientes = array;
            } else {
                state.clientes = state.copia;
            }            
        },
        setCodigoPostal(state, postal) {
            state.cliente.colonia = postal.d_asenta;
            state.cliente.municipio = postal.D_mnpio;
            state.cliente.estado = postal.d_estado;
            state.cliente.pais = postal.pais;
            this.state.postalModule.codigos = [];
        }
    },
    actions: {
        async getClientes({ commit }) {
            try {
                let response = await cliente.findAll();
                commit('setClientes', response);
            } catch (error) {
                cliente.error(error);
            }
        },
        async getCliente({ commit }, payload) {
            try {
                let response = await cliente.findById(payload);
                commit('setCliente', response);
            } catch (error) {
                router.push('/cliente');
                cliente.error(error);
            }
        },
        async postCliente({ dispatch, state }, payload) {
            try {
                let response = await cliente.create(payload);
                cliente.success(response.msg);
                router.push('/cliente');
                state.cliente = new Cliente();
                dispatch('getClientes');
            } catch (error) {
                cliente.error(error);
            }
        },
        async putCliente({ dispatch }, payload) {
            try {
                let response = await cliente.update(payload);
                cliente.success(response.msg);
                router.push('/cliente');
                dispatch('getClientes');
            } catch (error) {
                cliente.error(error);
            }
        },
        async deleteCliente({ dispatch }, payload) {
            try {
                let response = await cliente.delete(payload);
                cliente.success(response.msg);
                dispatch('getClientes');
            } catch (error) {
                cliente.error(error);
            }
        }
    }
}

export default clienteModule;

