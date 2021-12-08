import axios from 'axios'
import Swal from 'sweetalert2'
import Usuario from '../classes/usuario';
import router from '../router';
import socket from '../classes/socket'

const usuario = new Usuario();

const usuarioModule = {
    namespaced: true,
    state: () => ({
        usuario,
        socket,
        usuarios: [],
        copia: [],
        user_accepted: false,
        user_rol: ''
    }),
    mutations: {
        setAuth(state, auth) {
            state.user_accepted = true;
            state.user_rol = auth.data.user_rol;
            localStorage.setItem('token', auth.token);
            localStorage.setItem('usuario', JSON.stringify(auth.data));
            state.usuario = new Usuario();

            let room = 'admin';

            if (auth.data.user_rol === 'USER_CLIENTE_SYSTEM') {
                room = 'cliente';
            }

            socket.connectToWorkspace(`empresa_${auth.data.empresa.replace(/-/g, '_')}`, room);
        },
        logOut(state) {
            localStorage.removeItem('usuario');
            state.user_accepted = false;

            // state.socket.disconnectToWorkspace();
            router.push('/');
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
                let response = await usuario.auth(payload);
                commit('setAuth', response);
                
                if (response.data.user_rol === 'USER_CLIENTE_SYSTEM') {
                    router.push('/cotizacion');
                } else if (response.data.user_rol === 'USER_ROOT_SYSTEM') {
                    router.push('/root');
                } else {
                    router.push('/home');
                }

            } catch (error) {
                console.log(error);
                let errorStatus = error.response;

                if (errorStatus === 404) {
                    usuario.notFound(error.response.data.message);
                } else {
                    usuario.error('Hubo un error');
                }
            }
        },
        async getUsuarios({ commit }) {
            try {
                let response = await usuario.findAll();
                commit('setUsuarios', response);
            } catch (error) {
                usuario.error(error);
            }
        },
        async getUsuario({ commit }, payload) {
            try {
                let response = await usuario.findById(payload);
                commit('setUsuario', response);
            } catch (error) {
                router.push('/usuario');
                usuario.error(error);
            }
        },
        async postUsuario({ dispatch, state }, payload) {
            try {
                let response = await usuario.create(payload);
                usuario.success(response.msg);
                router.push('/usuario');
                state.usuario = new Usuario();
                dispatch('getUsuarios');
            } catch (error) {
                usuario.error(error);
            }
        },
        async putUsuario({ dispatch }, payload) {
            try {
                let response = await usuario.update(payload);
                usuario.success(response.msg);
                router.push('/usuario');
                dispatch('getUsuarios');
            } catch (error) {
                usuario.error(error);
            }
        },
        async deleteUsuario({ dispatch }, payload) {
            try {
                let response = await usuario.delete(payload);
                usuario.success(response.msg);
                dispatch('getUsuarios');
            } catch (error) {
                usuario.error(error);
            }
        }
    },
    getters: {
        getUser(state) {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (usuario === null) {
                state.user_accepted = false;
                state.user_rol = '';
            } else {
                state.user_accepted = true;
                state.user_rol = usuario.user_rol;
            }
        }
    }
}

export default usuarioModule;

