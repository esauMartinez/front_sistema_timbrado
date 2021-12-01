import axios from 'axios';
import { url, urlCp } from '../services/url'
import Swal from 'sweetalert2';

import Mercancia from './mercancia';

class Trip extends Mercancia {
    
    constructor(
        id = '',
        nombre_cliente = '',
        cliente = '',
        nombre_operador = '',
        operador = '',
        remolque = '',
        unidad = '',
        origen = '',
        destino = '',
        estatus = ''
    ) {
        super();
        this.id = id;
        this.nombre_cliente = nombre_cliente;
        this.cliente = cliente;
        this.operador = operador;
        this.nombre_operador = nombre_operador;
        this.remolque = remolque;
        this.unidad = unidad;
        this.origen = origen;
        this.destino = destino;
        this.estatus = estatus;
    }

    findAllTrips(estatus) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/trip/estatus/${estatus}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findTripById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/trip/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    create(trip) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/trip`, trip).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    update(trip) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/trip/${trip.id}`, trip).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findCliente(nombre) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cliente/nombre/${nombre}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findOperador(nombre) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/operador/nombre/${nombre}`).then(response => resolve(response.data)).catch(error => reject(error))
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


export default Trip;