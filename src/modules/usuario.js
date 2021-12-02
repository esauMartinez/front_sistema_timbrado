import axios from 'axios'
import Swal from 'sweetalert2'
import Usuario from '../classes/usuario';
import router from '../router';


const usuario = new Usuario();

const usuarioModule = {
    namespaced: true,
    state: () => ({
        usuario,
        user_accepted: false,
        user_rol: ''
    }),
    mutations: {
        setAuth(state, auth) {
            state.user_accepted = true;
            state.user_rol = auth.data.user_rol;
            localStorage.setItem('token', JSON.stringify(auth.token));
            localStorage.setItem('usuario', JSON.stringify(auth.data));
            state.usuario = new Usuario();
        },
        logOut(state) {
            localStorage.removeItem('usuario');
            state.user_accepted = false;
            router.push('/');
        }
    },
    actions: {
        async auth({ commit }, payload) {
            try {
                let response = await usuario.auth(payload);
                commit('setAuth', response);
                
                if (response.data.user_rol === 'CLIENTE') {
                    router.push('/cotizacion');
                } else {
                    router.push('/home');
                }

            } catch (error) {
                let errorStatus = error.response.status;

                if (errorStatus === 404) {
                    usuario.notFound(error.response.data.message);
                } else {
                    usuario.error('Hubo un error');
                }
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

