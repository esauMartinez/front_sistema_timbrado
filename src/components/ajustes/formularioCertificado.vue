<template>
    <form @submit.prevent="uploadCertificados()" enctype="multipart/form-data" id="form-certificados">
        <div class="row">
            <div class="col-lg-12 mb-3">
                <label for="formFile" class="form-label">Archivo .CER</label>
                <input class="form-control" type="file" @change="handleFileUploadCer( $event )"  required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="formFile" class="form-label">Archivo .KEY</label>
                <input class="form-control" type="file" @change="handleFileUploadKey( $event )" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="formFile" class="form-label">Password</label>
                <input class="form-control" type="password" v-model="password" required>
            </div>
            <div class="col-lg-12 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary w-25">Guardar</button>
            </div>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
import { url } from '../../services/url';
import token from '../../services/token';
export default {
    name: 'Certificados',
    data() {
        return {
            cer: null,
            key: null,
            password: null
        }
    },
    methods: {
        uploadCertificados() {
            const formData = new FormData();
            formData.append('cer', this.cer);
            formData.append('key', this.key);
            formData.append('password', this.password);
            axios.post(`${url}/empresa/uploadCertificados`, formData, token()).then(data => console.log(data.data)).catch(error => console.log(error));
        },
        handleFileUploadCer(event){
            this.cer = event.target.files[0];
        },
        handleFileUploadKey(event){
            this.key = event.target.files[0];
        },
    }
}
</script>

