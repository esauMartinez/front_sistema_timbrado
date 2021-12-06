import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Operador {
    constructor(
        id = '',
        nombre = '',
        paterno = '',
        materno = '',
        fecha_nacimiento = '',
        fecha_ingreso = '',
        curp = '',
        rfc = '',
        codigo_postal = '',
        colonia = '',
        municipio = '',
        estado = '',
        pais = '',
        calle = '',
        exterior = '',
        interior = '',
        licencia = '',
        vencimiento_licencia = '',
        estatus = ''
    ) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_ingreso = fecha_ingreso;
        this.curp = curp;
        this.estado = estado;
        this.codigo_postal = codigo_postal;
        this.colonia = colonia;
        this.municipio = municipio;
        this.rfc = rfc;
        this.pais = pais;
        this.calle = calle;
        this.exterior = exterior;
        this.interior = interior;
        this.licencia = licencia;
        this.vencimiento_licencia = vencimiento_licencia;
        this.estatus = estatus;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/operador`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/operador/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(operador) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/operador`, operador, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(operador) {
        console.log(operador);
        return new Promise((resolve, reject) => {
            axios.put(`${url}/operador/${operador.id}`, operador, token()).then(response => resolve(response.data)).catch(error => reject(error))
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
                    axios.delete(`${url}/operador/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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


export default Operador;