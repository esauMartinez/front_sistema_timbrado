import axios from "axios";
import socket from '../classes/socket'
import token from "../services/token";
import { url } from "../services/url";
import store from "../store";

async function verifyUser(to, from, next) {
    const token_local_storage = localStorage.getItem('token');


    if (!store.state.usuarioModule.user_accepted) {

        let empresaRol = store.getters['usuarioModule/getEmpresaRol'];
        let room = 'admin';

        if (empresaRol !== null) {
            if (empresaRol.user_rol === 'USER_CLIENTE_SYSTEM') {
                room = 'cliente';
            }
            if (empresaRol.empresa !== null) {
                socket.connectToWorkspace(`empresa_${empresaRol.empresa.replace(/-/g, '_')}`, room);
            }
        }
    }

    store.getters['usuarioModule/getUser'];


    if (token_local_storage === null) {
        return next('/');
    } else {
        try {
            let verifyUserAPI = await axios.get(`${url}/verifyUser`, token());

            if (verifyUserAPI.data === 'ok') {
                next();
            } else {

                alert('Tu session a expirado');

                next('/');
            }
        } catch (error) {
            next('/');
        }
    }
}

export default verifyUser;