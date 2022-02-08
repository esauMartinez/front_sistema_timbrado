import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Unidad {
    constructor(
        id = '',
        numero_economico = '',
        matricula = '',
        numero_serie = '',
        aseguradora = '',
        numero_poliza = '',
        vencimiento_poliza = '',
        marca = '',
        modelo = '',
        clase = '',
        estatus = true,
        configuracion_vehicular = ''
    ){
        this.id = id
        this.numero_economico = numero_economico
        this.matricula = matricula
        this.numero_serie = numero_serie
        this.aseguradora = aseguradora
        this.numero_poliza = numero_poliza
        this.vencimiento_poliza = vencimiento_poliza
        this.marca = marca
        this.modelo = modelo
        this.clase = clase
        this.estatus = estatus
        this.configuracion_vehicular = configuracion_vehicular
    }

    findAll(){
        return new Promise((resolve, reject) => {
            axios.get(`${url}/unidad`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id){
        return new Promise((resolve, reject) => {
            axios.get(`${url}/unidad/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(unidad){
        return new Promise((resolve, reject) => {
            axios.post(`${url}/unidad`, unidad, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(unidad){
        return new Promise((resolve, reject) => {
            axios.put(`${url}/unidad/${unidad.id}`, unidad, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id){
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'No'
            }).then((result) => {
                if(result.isConfirmed ) {
                    axios.delete(`${url}/unidad/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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
        });
    }

    error(msg) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg
        });
    }

    notFound(msg) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: msg
        });
    }
}

export default Unidad;