import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Usuario {
    constructor(id = '', nombre = '', paterno = '', materno = '', email = 'martinez117esau@gmail.com', password= 'Mace930111', user_rol = '', cliente = null) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.email = email;
        this.password = password;
        this.user_rol = user_rol;
        this.cliente = cliente;
    }

    auth(auth) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/auth`, auth).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/usuario`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/usuario/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }


    create(usuario) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/usuario`, usuario, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(usuario) {
        console.log(usuario);
        return new Promise((resolve, reject) => {
            axios.put(`${url}/usuario/${usuario.id}`, usuario, token()).then(response => resolve(response.data)).catch(error => reject(error))
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
                    axios.delete(`${url}/usuario/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
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

export default Usuario;