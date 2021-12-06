import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Mercancia {
    constructor(
        id = '',
        producto = 'asdasd',
        claveProducto = '',
        unidadMedida = '',
        claveUnidadMedida = '',
        cantidad = '',
        peso = '',
        fraccionArancelaria = '',
        uuidComercioExt = '',
        trip = ''
    ) {
        this.id = id;
        this.producto = producto;
        this.claveProducto = claveProducto;
        this.unidadMedida = unidadMedida;
        this.claveUnidadMedida = claveUnidadMedida;
        this.cantidad = cantidad;
        this.peso = peso;
        this.fraccionArancelaria = fraccionArancelaria;
        this.uuidComercioExt = uuidComercioExt;
        this.trip = trip;
    }

    findAll(trip) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/mercancia/${trip}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(mercancia) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/mercancia`, mercancia).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${url}/mercancia/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
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


export default Mercancia;