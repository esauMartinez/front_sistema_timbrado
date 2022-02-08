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

        numero_economico_remolque = '',
        remolque = '',

        numero_economico_unidad = '',
        unidad = '',

        nombre_origen = '',
        origen = '',

        nombre_destino = '',
        destino = '',
        
        estatus = '',
        moneda = 'MXN',
        tipo_viaje = 'nacional',
        metodo_pago = null,
        forma_pago = null,
        uso_CFDI = null,
        fecha_salida = null,
        fecha_llegada = null,
        kilometros = null
    ) {
        this.id = id;
        
        this.nombre_cliente = nombre_cliente;
        this.cliente = cliente;

        this.operador = operador;
        this.nombre_operador = nombre_operador;

        this.numero_economico_remolque = numero_economico_remolque;
        this.remolque = remolque;

        this.numero_economico_unidad = numero_economico_unidad;
        this.unidad = unidad;
        
        this.nombre_origen = nombre_origen;
        this.origen = origen;

        this.nombre_destino = nombre_destino;
        this.destino = destino;

        this.estatus = estatus;

        this.moneda = moneda;
        this.tipo_viaje = tipo_viaje;
        this.metodo_pago = metodo_pago;
        this.forma_pago = forma_pago;
        this.uso_CFDI = uso_CFDI;
        this.fecha_salida = fecha_salida;
        this.fecha_llegada = fecha_llegada;
        this.kilometros = kilometros;
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

    setBody() {
        if (document.getElementsByClassName('modal-backdrop')[0] !== undefined) {
            document.getElementsByClassName('modal-backdrop')[0].remove();
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
            document.getElementsByTagName('body')[0].classList.remove('modal-open');
        }
    }

}


export default Trip;