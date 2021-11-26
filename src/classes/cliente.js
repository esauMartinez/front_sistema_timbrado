import axios from 'axios';
import { url } from '../services/url'
import Swal from 'sweetalert2';

class Cliente {
    constructor(
        id = '',
        razon_social = '',
        origen = '',
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
            axios.get(`${url}/cliente`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/cliente/id/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    create(cliente) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/cliente`, cliente).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(cliente) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/cliente/${cliente.id}`, cliente).then(response => resolve(response.data)).catch(error => reject(error))
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
                    axios.delete(`${url}/cliente/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
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