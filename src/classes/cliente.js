import axios from 'axios'
import { url, urlCp } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Cliente {
    constructor(
        id = '',
        razon_social = '',
        origen = 'nacional',
        codigo_postal = '',
        colonia = '',
        municipio = '',
        estado = '',
        pais = '',
        calle = '',
        exterior = '',
        interior = '',
        rfc = '',
        tax_id = ''
    ) {
        this.id = id;
        this.razon_social = razon_social;
        this.origen = origen;
        this.codigo_postal = codigo_postal;
        this.colonia = colonia; 
        this.municipio = municipio;
        this.estado = estado;
        this.pais = pais;
        this.calle = calle;
        this.exterior = exterior;
        this.interior = interior;
        this.rfc = rfc;
        this.tax_id = tax_id;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cliente`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cliente/id/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    create(cliente) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/cliente`, cliente, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(cliente) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/cliente/${cliente.id}`, cliente, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    searchCp(codigo_postal) {
        return new Promise((resolve, reject) => {
            axios.get(`${urlCp}/place/places/${codigo_postal}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    delete(id) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Estas seguro ?',
                text: "No podras revertir esta accion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {                    
                    axios.delete(`${url}/cliente/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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


export default Cliente;