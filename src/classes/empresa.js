import axios from 'axios'
import { url, urlCp } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Empresa {
    constructor(
        id = '',
        uuid = '',
        razon_social = '',
        usuarios = '',
        rfc = ''
    ) {
        this.id = id;
        this.uuid = uuid;
        this.razon_social = razon_social;
        this.usuarios = usuarios;
        this.rfc = rfc;
    }


    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/empresa`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/empresa/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(empresa) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/empresa`, empresa, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(empresa) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/empresa/${empresa.id}`, empresa, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }


    success(msg) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
        })
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

export default Empresa;
