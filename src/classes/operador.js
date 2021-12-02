import axios from 'axios';
import { url } from '../services/url';
import Swal from 'sweetalert2';

class Operador {
    constructor(
        id = '',
        nombre = '',
        paterno = '',
        materno = '',
        fecha_nacimiento = '',
        fecha_ingreso ='',
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
        estatus = true
    ){
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_ingreso = fecha_ingreso;
        this.curp = curp;
        this.rfc = rfc;
        this.codigo_postal = codigo_postal;
        this.colonia = colonia;
        this.municipio = municipio;
        this.estado = estado;
        this.pais = pais;
        this.calle = calle;
        this.exterior = exterior;
        this.interior = interior;
        this.licencia = licencia;
        this.vencimiento_licencia = vencimiento_licencia;
        this.estatus = estatus;
    }

    findAll(){
        return new Promise((resolve, reject) => {
            axios.get(`${url}/operador`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id){
        return new Promise((resolve, reject) => {
            axios.get(`${url}/operador/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(operador){
        return new Promise((resolve, reject) => {
            axios.post(`${url}/operador`, operador).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(operador){
        return new Promise((resolve, reject) => {
            axios.put(`${url}/operador/${operador.id}`, operador).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id){
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`${url}/operador/${id}`).then(response => resolve(response.data)).catch(error => reject(error))
                }
            })
        });
    }

    success(message){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    error (message){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        })
    }

    notFound(message){
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: message
        })
    }

}

export default Operador;