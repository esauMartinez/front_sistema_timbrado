import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Remolque {
    constructor(
        id = '',
        numero_economico = '',
        placa = '',
        estus = true,
        marca = '',
        clase = '',
        numero_serie = '',
        numero_poliza = '',
        vencimiento_poliza = '',
        modelo = '',
        subtipo = ''
    ){
        this.id = id;
        this.numero_economico = numero_economico;
        this.placa = placa;
        this.estus = estus;
        this.marca = marca;
        this.clase = clase;
        this.numero_serie = numero_serie;
        this.numero_poliza = numero_poliza;
        this.vencimiento_poliza = vencimiento_poliza;
        this.modelo = modelo;
        this.subtipo = subtipo;
    }

    findAll(){
        return new Promise((resolve, reject) => {
            axios.get(`${url}/remolque`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id){
        return new Promise((resolve, reject) => {
            axios.get(`${url}/remolque/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(remolque){
        return new Promise((resolve, reject) => {
            axios.post(`${url}/remolque`, remolque, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(remolque){
        return new Promise((resolve, reject) => {
            console.log(remolque);
            axios.put(`${url}/remolque/${remolque.id}`, remolque, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    delete(id){
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: '¿Estas seguro?',
                text: "No podras revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No'
            }).then((result) => {
                if(result.isConfirmed){
                    axios.delete(`${url}/remolque/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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
            icon: 'warning',
            title: 'Oops...',
            text: msg
        })
    }
}

export default Remolque;