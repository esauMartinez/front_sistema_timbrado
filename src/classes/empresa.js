import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Empresa {
    constructor(
        id = '',
        uuid = '',
        razon_social = '',
        codigo_postal = '',
        usuarios = '',
        rfc = '',
        email = '',
        password = '',
        confirm_password = '',
        timbres = 1,
        token = '',
        permiso_SCT = '',
        numero_permiso_SCT = '',
        clave_regimen_fiscal = '',
        descripcion_regimen_fiscal = '',
        calle = '',
        colonia = '',
        municipio = '',
        estado = '',
        pais = '',
        numero_exterior = '',
        numero_interior = '',
    ) {
        this.id = id;
        this.uuid = uuid;
        this.razon_social = razon_social;
        this.codigo_postal = codigo_postal;
        this.usuarios = usuarios;
        this.rfc = rfc;
        this.email = email;
        this.password = password,
        this.confirm_password = confirm_password;
        this.timbres = timbres;
        this.token = token;
        this.permiso_SCT = permiso_SCT;
        this.numero_permiso_SCT = numero_permiso_SCT;
        this.clave_regimen_fiscal= clave_regimen_fiscal;
        this.descripcion_regimen_fiscal = descripcion_regimen_fiscal;
        this.calle = calle;
        this.colonia = colonia;
        this.municipio = municipio;
        this.estado = estado;
        this.pais = pais;
        this.numero_exterior = numero_exterior;
        this.numero_interior = numero_interior;
    }


    findAll() {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/empresa`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/empresa/${id}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    create(empresa) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/empresa`, empresa, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    update(empresa) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/empresa/${empresa.id}`, empresa, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    updatePermisoSCT(empresa) {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/empresa/updatePermisoSCT/${empresa.empresa}`, empresa, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    uploadLogoEmpresa(logo) {
        return new Promise((resolve, reject) => {
            token()['Content-Type'] = 'multipart/form-data';
            axios.post(`${url}/empresa/uploadLogoEmpresa`, logo, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

    uploadUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/empresa/uploadUser`, user, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
    
    addTimbresEmpresa(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/empresa/addTimbresEmpresa`, payload, token()).then(response => resolve(response.data)).catch(error => reject(error))
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
            text: msg.response.data.msg,
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

export default Empresa;
