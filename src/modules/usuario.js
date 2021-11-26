import axios from 'axios'
import Swal from 'sweetalert2'
import usuario from '../classes/usuario';
import router from '../router';

const usuarioModule = {
    namespaced: true,
    state: () => ({
        usuario,
        user_accepted: true
    }),
    mutations: {
        setAuth(state, auth) {
            state.user_accepted = true;
            localStorage.setItem('usuario', JSON.stringify(auth));
        }
    },
    actions: {
        async auth({ commit }, payload) {
            try {
                let response = await usuario.auth(payload);
                commit('setAuth', response);

                router.push('/home');
            } catch (error) {
                let errorStatus = error.response.status;

                if (errorStatus === 404) {
                    usuario.notFound(error.response.data.message);
                } else {
                    usuario.error('Hubo un error');
                }
            }
        }
    }
}

export default usuarioModule;

