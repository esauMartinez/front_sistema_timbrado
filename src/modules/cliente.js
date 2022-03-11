import router from '../router'
import Cliente from '../classes/cliente'
import store from '../store'
import axios from 'axios'
import { forma_pago, metodo_pago, uso_cfdi } from '../services/datos'
import { messages } from '../classes/messages'
import { url } from '../services/url'
let cliente = new Cliente()

const clienteModule = {
    namespaced: true,
    state: () => ({
        cliente,
        clientes: [],
        copia: [],
        forma_pago,
        metodo_pago,
        uso_cfdi
    }),
    mutations: {
        setClientes(state, clientes) {
            state.clientes = clientes;
            state.copia = clientes;
        },
        setCliente(state, cliente) {
            state.cliente = cliente;
            store.commit('tripModule/setCliente', cliente);
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
                const { data } = await axios.get(`${url}/cliente`, token());
                commit('setClientes', data);
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async getCliente({ commit }, payload) {
            try {
                const { data } = await axios.get(`${url}/cliente/id/${payload}`, token());
                commit('setCliente', data);
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async postCliente({ dispatch, state }, payload) {
            try {
                let data = await axios.post(`${url}/cliente`, payload, token());
                state.cliente = new Cliente();
                messages.statusMessage(data);
                dispatch('getClientes');
                router.push('/cliente');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async putCliente({ dispatch }, payload) {
            try {
                let data = await axios.put(`${url}/cliente/${payload.id}`, payload, token());
                messages.statusMessage(data);
                router.push('/cliente');
                dispatch('getClientes');
            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async deleteCliente({ dispatch }, payload) {
            try {
                const responseQuestion = await messages.question();

                if (responseQuestion) {
                    let data = await axios.delete(`${url}/cliente/${payload}`, token());
                    messages.statusMessage(data);
                    dispatch('getClientes');
                }                
            } catch (error) {
                messages.statusMessage(error.response);
            }
        }
    }
}

export default clienteModule;

