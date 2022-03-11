import axios from 'axios'
import { url } from '../services/url'
import token from '../services/token'
import Swal from 'sweetalert2'

class Cotizacion {
    constructor(
        id = '',
        origen = {
            nombre: '',
            codigo_postal: '',
            colonia: '',
            c_colonia: '',
            municipio: '',
            c_municipio: '',
            estado: '',
            c_estado: '',
            pais: '',
            c_pais: '',
            calle: '',
            exterior: '',
            interior: '',
            localidad: ''
        },
        destino = {
            nombre: '',
            codigo_postal: '',
            colonia: '',
            c_colonia: '',
            municipio: '',
            c_municipio: '',
            estado: '',
            c_estado: '',
            pais: '',
            c_pais: '',
            calle: '',
            exterior: '',
            interior: '',
            localidad: ''
        },
        costo_viaje = 0,
        moneda = 'MXN',
        tipo_viaje = 'nacional',
        metodo_pago = null,
        forma_pago = null,
        uso_CFDI = null
    ) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.costo_viaje = costo_viaje;
        this.moneda = moneda;
        this.tipo_viaje = tipo_viaje;
        this.metodo_pago = metodo_pago;
        this.forma_pago = forma_pago;
        this.uso_CFDI = uso_CFDI;
    }

    findAll(estatus) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cotizacion/estatus/${estatus}`, token()).then(response => resolve(response.data)).catch(error => reject(error));            
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
    
    cotizar(cotizacion) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/cotizacion/cotizar/${cotizacion.id}`, cotizacion, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    upladMercanciasFromFile(formData) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/upload-file-cotizacion`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => resolve(response.data)).catch((error) => reject(error));
        });
    }

    deleteMercanciasCotizacion(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${url}/delete-mercancias-cotizacion/${id}`, token()).then((response) => resolve(response.data)).catch((error) => reject(error));
        });
    }

    autorizar(id) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Deseas autorizar la cotizacion?',
                text: "Ya no se podran hacer cambios",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`${url}/cotizacion/autorizar/${id}`, {}, token()).then(response => resolve(response.data)).catch(error => reject(error))
                }
            })
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