<template>
    <div class="container mt-5">
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-certificados">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseCertificados" aria-expanded="true" aria-controls="panelsStayOpen-collapseCertificados">
                        Certificados
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseCertificados" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-certificados">
                    <div class="accordion-body">
                        <formAjuste></formAjuste>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-perimso">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsePermiso" aria-expanded="true" aria-controls="panelsStayOpen-collapsePermiso">
                        Datos SCT
                    </button>
                </h2>
                <div id="panelsStayOpen-collapsePermiso" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-perimso">
                    <div class="accordion-body">
                        <form action="" @submit.prevent="updatePermisoSCT(empresa)">
                            <div class="row">
                                <div class="col-lg-4 mb-3">
                                    <label for="" class="form-lable">Regimen fiscal</label>
                                    <!-- <input type="text" class="form-control" v-model="empresa.clave_regimen_fiscal" required> -->
                                    <select class="form-control" v-model="regimen" @change="setRegimenFiscal(regimen)" required>
                                        <option value=""></option>
                                        <option v-for="(item, index) in regimen_fiscal" :key="index" :value="item">{{item.clave}} - {{ item.descripcion }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="" class="form-lable">Permiso SCT</label>
                                    <input type="text" class="form-control" v-model="empresa.permiso_SCT" required>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="" class="form-lable">Numer permiso SCT</label>
                                    <input type="text" class="form-control" v-model="empresa.numero_permiso_SCT" required>
                                </div>                               
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <button class="btn btn-primary w-25">Guardar</button>
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
import { mapActions, mapMutations, mapState } from 'vuex'
import formAjuste from '../components/ajustes/formularioCertificado.vue'
export default {
    name: 'ajustes',
    components: {
        formAjuste
    },
    data() {
        return {
            regimen: null
        }
    },
    computed: {
        ...mapState('empresaModule', ['empresa', 'regimen_fiscal'])
    },
    methods: {
        ...mapMutations('empresaModule', ['setRegimenFiscal']),
        ...mapActions('empresaModule', ['updatePermisoSCT'])
    },
}
</script>

