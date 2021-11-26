import axios from 'axios';
import { url } from '../services/url'
import Swal from 'sweetalert2';

class Usuario {
    constructor(id = '', nombre = '', email = 'martinez117esau@gmail.com', password= 'Mace930111', user_rol = '') {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.user_rol = user_rol;
    }

    auth(auth) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/auth`, auth).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }



    error(msg) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    }

    notFound(msg) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: msg,
        })
    }

}


const usuario = new Usuario();

export default usuario;