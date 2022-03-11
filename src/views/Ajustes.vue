<template>
    <div class="container-fluid">
        <div 
            class="accordion" 
            id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 
                    class="accordion-header" 
                    id="panelsStayOpen-certificados">
                    <button 
                        class="accordion-button" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#panelsStayOpen-collapseCertificados" 
                        aria-expanded="true" 
                        aria-controls="panelsStayOpen-collapseCertificados">
                        Certificados
                    </button>
                </h2>
                <div 
                    id="panelsStayOpen-collapseCertificados" 
                    class="accordion-collapse collapse show" 
                    aria-labelledby="panelsStayOpen-certificados">
                    <div class="accordion-body">
                        <formAjuste></formAjuste>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 
                    class="accordion-header" 
                    id="panelsStayOpen-perimso">
                    <button 
                        class="accordion-button" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#panelsStayOpen-collapsePermiso" 
                        aria-expanded="true" 
                        aria-controls="panelsStayOpen-collapsePermiso">
                        Datos empresa
                    </button>
                </h2>
                <div 
                    id="panelsStayOpen-collapsePermiso" 
                    class="accordion-collapse collapse show" 
                    aria-labelledby="panelsStayOpen-perimso">
                    <div class="accordion-body">
                        <form 
                            action="" 
                            @submit.prevent="updatePermisoSCT(empresa)">
                            <div class="row">
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Calle
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.calle" 
                                        required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Colonia
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.colonia" 
                                        required>
                                </div>                               
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Municipio
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.municipio" 
                                        required>
                                </div>                               
                                <div class="col-lg-6 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Estado
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.estado" 
                                        required>
                                </div>                               
                                <div class="col-lg-6 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Pais
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.pais" 
                                        required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Numero exterior
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.numero_exterior" 
                                        required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Numero interior
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.numero_interior" 
                                        required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Codigo postal
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.codigo_postal" 
                                        required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Regimen fiscal
                                    </label>
                                    <select 
                                        class="form-control" 
                                        v-model="empresa.clave_regimen_fiscal" 
                                        required>
                                        <option value=""></option>
                                        <option 
                                            v-for="(item, index) in regimen_fiscal" 
                                            :key="index" 
                                            :value="item.clave">{{item.clave}} - {{ item.descripcion }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Permiso SCT
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.permiso_SCT" 
                                        required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label 
                                        for="" 
                                        class="form-label">
                                        Numer permiso SCT
                                    </label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="empresa.numero_permiso_SCT" 
                                        required>
                                </div>                               
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <button 
                                        class="btn btn-primary w-25">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>       

            <div class="accordion-item">
                <h2 
                    class="accordion-header" 
                    id="panelsStayOpen-perimso">
                    <button 
                        class="accordion-button" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#panelsStayOpen-collapsePermiso" 
                        aria-expanded="true" 
                        aria-controls="panelsStayOpen-collapsePermiso">
                        Logotipo de la empresa
                    </button>
                </h2>
                <div 
                    id="panelsStayOpen-collapsePermiso" 
                    class="accordion-collapse collapse show" 
                    aria-labelledby="panelsStayOpen-perimso">
                    <div class="accordion-body">
                        <form 
                            @submit.prevent="uploadLogo(logo)" 
                            id="form-logo">
                            <div class="row">
                                <div class="col-lg-4 offset-lg-4 mb-3">
                                    <div 
                                        class="card" 
                                        style="width: 18rem;">
                                        <img 
                                            v-if="empresa.uuid !== ''"
                                            :src="`${url}/uploads/${empresa.uuid}/${empresa.logo}`" 
                                            height="200" 
                                            width="100%" 
                                            class="card-img-top" 
                                            alt="logotipo empresa">
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <input 
                                        type="file" 
                                        class="form-control" 
                                        name="logo" 
                                        @change="handleFileUpload( $event )" 
                                        required>
                                </div>                       
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <button 
                                        class="btn btn-primary w-25">
                                        Guardar logotipo
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import formAjuste from '../components/ajustes/formularioCertificado.vue'
import { url } from '../services/url'
export default {
    name: 'ajustes',
    components: {
        formAjuste
    },
    data() {
        return {
            regimen: null,
            logo: null,
            url
        }
    },
    computed: {
        ...mapState(
            'empresaModule', 
            [ 'empresa', 'regimen_fiscal' ]
        )
    },
    methods: {
        ...mapMutations(
            'empresaModule', 
            [ 'setRegimenFiscal' ]
        ),
        ...mapActions(
            'empresaModule', 
            [ 'updatePermisoSCT', 'getEmpresa', 'uploadLogo' ]
        ),
        ...mapGetters(
            'usuarioModule', 
            [ 'getEmpresaRol' ]
        ),
        handleFileUpload(event){
            this.logo = event.target.files[0];
        }
    },
    mounted() {
        const empresa = this.getEmpresaRol();
        this.getEmpresa(empresa.empresa);
    },
}
</script>

