import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Servicio {
    constructor(
        id = '',
        clave = '',
        descripcion = ''
    ) {
        this.id = id;
        this.clave = clave;
        this.descripcion = descripcion;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/servicio`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/servicio/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }


    create(servicio) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/servicio`, servicio, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${url}/servicio/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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


export default Servicio;