import axios from 'axios'
import { url, urlCp } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Trip {
    
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
            axios.get(`${url}/trip/estatus/${estatus}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findTripById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/trip/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    create() {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Deseas crear un nuevo trip ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${url}/trip`, {}, token()).then(response => resolve(response.data)).catch(error => reject(error))
                }
            })
        });
    }
    
    update(trip) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/trip/${trip.id}`, trip, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    observationsCancelTrip() {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Comentarios de cancelacion de trip',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                showLoaderOnConfirm: true,
                preConfirm: (comments) => {
                    return comments;
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(result);
                }
            })
        });
    }

    questionCancelTrip() {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Deseas cancelar el trip ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const comments = await this.observationsCancelTrip();
                    resolve(comments.value);
                }
            })
        });
    }

    updateStatus(trip) {
        return new Promise(async (resolve, reject) => {

            let observationsCancel = null;

            if (trip.estatus === 'cancelado') {
                let response_question = await this.questionCancelTrip();
                observationsCancel = response_question;
            }

            axios.put(`${url}/trip/${trip.id}/${trip.estatus}/${observationsCancel}`, trip, token()).then(response => resolve(response.data)).catch(error => reject(error));
        });
    }

    findCliente(nombre) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cliente/nombre/${nombre}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findOperador(nombre) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/operador/nombre/${nombre}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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