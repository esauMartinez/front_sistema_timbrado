import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Concepto {
    constructor(
        id = '',
        concepto = null,
        clave_concepto = null,
        monto = null,
        iva = null,
        retencion = null,
        tipo = null,
        clave = null,
        
    ) {
        this.id = id;
        this.concepto = concepto;
        this.clave_concepto = clave_concepto;
        this.monto = monto;
        this.iva = iva;
        this.retencion = retencion;
        this.tipo = tipo;
        this.clave = clave;
    }

    findAll(trip) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/concepto/${trip}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findAllCotizacion(cotizacion) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/concepto/cotizacion/${cotizacion}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(concepto) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/concepto`, concepto).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${url}/concepto/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
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


export default Concepto;