import axios from 'axios'
import { url, urlCp } from '../services/url'
import token from '../services/token'
import Swal from 'sweetalert2'

class Cotizacion {
    constructor(
        id = '',
        origen = {
            nombre: '',
            codigo_postal: '',
            colonia: '',
            municipio: '',
            estado: '',
            pais: '',
            calle: '',
            exterior: '',
            interior: ''
        },
        destino = {
            nombre: '',
            codigo_postal: '',
            colonia: '',
            municipio: '',
            estado: '',
            pais: '',
            calle: '',
            exterior: '',
            interior: ''
        },
        mercancias = []
    ) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.mercancias = mercancias;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cotizacion`, token()).then(response => resolve(response.data)).catch(error => reject(error));            
        });
    }
    
    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cotizacion/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error));            
        });
    }

    update(cotizacion) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/cotizacion/${cotizacion.id}`, cotizacion, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    aceptCotizacion(id) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/cotizacion/aceptCotizacion/${id}`, {}, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create() {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Deseas crear una nueva cotizacion ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {

                    axios.post(`${url}/cotizacion`, {}, token()).then(response => resolve(response.data)).catch(error => reject(error))
                }
            })
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

export default Cotizacion;