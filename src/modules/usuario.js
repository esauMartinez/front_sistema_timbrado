import Usuario from '../classes/usuario';
import router from '../router';
import socket from '../classes/socket'
import axios from 'axios';
import { url } from '../services/url';
import { messages } from '../classes/messages';
import { render_page } from '../services/renderPage';

const usuario = new Usuario();

const usuarioModule = {
    namespaced: true,
    state: () => ({
        usuario,
        socket,
        usuarios: [],
        copia: [],
        user_accepted: false,
        user_rol: '',
        empresa: '',
        nombre: ''
    }),
    mutations: {
        setAuth(state, { data: { data: { user_rol, empresa } } }) {

            state.user_accepted = true;
            state.user_rol = user_rol;
            state.empresa = empresa;
            state.usuario = new Usuario();

            let room = 'admin';

            if (user_rol === 'USER_CLIENTE_SYSTEM') {
                room = 'cliente';
            }

            if (empresa !== null) {
                socket.connectToWorkspace(`empresa_${empresa.replace(/-/g, '_')}`, room);
            }
        },
        logOut(state) {
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            state.user_accepted = false;

            if (state.empresa !== null) {
                socket.disconnectToWorkspace();
            }
            
            router.push('/');
        },
        clearSession(state) {
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            state.user_accepted = false;
        },
        setUsuarios(state, usuarios) {
            state.usuarios = usuarios;
            state.copia = usuarios;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        searchUsuario(state, nombre) {
            let array = [];
            if (nombre !== '') {
                state.copia.filter(x => {
                    if (x.nombre.toUpperCase().indexOf(nombre.toUpperCase()) > -1) {
                        array.push(x);
                    }
                });

                state.usuarios = array;
            } else {
                state.usuarios = state.copia;
            }
        },
    },
    actions: {
        async auth({ commit }, payload) {
            try {
                const response = await axios.post(`${url}/auth`, payload);
                
                commit('setAuth', response);
                render_page(response);
                messages.statusMessage({ status: 200, data: { msg: 'Usuario autenticiado correctamente' } });

            } catch (error) {
                messages.statusMessage(error.response);
            }
        },
        async getUsuarios({ commit }, payload) {
            const { data } = await axios.get(`${url}/usuario/empresa/${payload}`, token());
            commit('setUsuarios', data);
        },
        async getUsuario({ commit }, payload) {
            const { data } = await axios.get(`${url}/usuario/${payload}`, token())
            commit('setUsuario', data);
        },
        async postUsuario({ dispatch, state }, payload) {
            const data = await axios.post(`${url}/usuario`, payload, token());
            messages.statusMessage(data);
            router.push('/usuario');
            state.usuario= new Usuario();
            dispatch('getUsuarios');
        },
        async putUsuario({ dispatch }, payload) {
            const data = await axios.put(`${url}/usuario/${payload.id}`, payload, token());
            messages.statusMessage(data);
            dispatch('getUsuarios', payload.empresa);
            router.push('/usuario');
        },
        async deleteUsuario({ dispatch }, { id, empresa }) {

            const responseQuestion = await messages.question();

            if (responseQuestion) {
                const data = await axios.delete(`${url}/usuario/${id}`, token());
                messages.statusMessage(data);
                dispatch('getUsuarios', empresa);
            }
        }
    },
    getters: {
        getUser(state) {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (usuario === null) {
                state.user_accepted = false;
                state.user_rol = '';
                state.empresa = '';
            } else {
                state.user_accepted = true;
                state.user_rol = usuario.user_rol;
                state.empresa = usuario.empresa;
                state.nombre = `${usuario.nombre} ${usuario.paterno} ${usuario.materno}`
            }
        },
        getEmpresaRol() {
            const usuario = JSON.parse(localStorage.getItem('usuario'));

            return usuario
        },
        logo() {
            const usuario = JSON.parse(localStorage.getItem('usuario'));

            return usuario.logo;
        }
    }
}

export default usuarioModule;

