import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Patio {
    constructor(
        id ='',
        nombre ='',
        codigo_postal = '',
        colonia = '',
        c_colonia = '',
        referencia = '',
        municipio ='',
        c_municipio = '',
        estado = '',
        c_estado = '',
        pais = '',
        c_pais = '',
        calle = '',
        exterior = '',
        interior = '',
        localidad = '',
        tipo = 'nacional'
    ) {
        this.id = id
        this.nombre = nombre
        this.codigo_postal = codigo_postal
        this.colonia = colonia
        this.c_colonia = c_colonia
        this.referencia = referencia
        this.municipio = municipio
        this.c_municipio = c_municipio
        this.estado = estado
        this.c_estado = c_estado
        this.pais = pais
        this.c_pais = c_pais
        this.calle = calle
        this.exterior = exterior
        this.interior = interior
        this.localidad = localidad
        this.tipo = tipo
    }

    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/patio`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/patio/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(patio) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/patio`, patio, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(patio) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/patio/${patio.id}`, patio, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
                cancelButtonText: 'No',
            }).then((result) => {
                if(result.isConfirmed) {
                    axios.delete(`${url}/patio/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
                }
            })
        });
    }

    success(msg){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
        })
    }

    error(msg){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg
        })
    }

    notFound(msg){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg
        })
    }
}

export default Patio;