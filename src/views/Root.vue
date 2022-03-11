<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mb-3 d-flex justify-content-end">
                <router-link 
                    class="btn btn-primary" 
                    to="/crear-empresa">
                    <!-- <font-awesome-icon icon="plus" /> -->
                    Crear Empresa
                </router-link>
                <!-- <input type="text" class="form-control w-25" placeholder="Buscar"> -->
            </div>
        </div>
        
        <table-empresa 
            :empresas="empresas">
        </table-empresa>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tableEmpresa from '../components/empresa/table.vue'
export default {
    name: 'Root',
    components: {
        tableEmpresa
    },
    computed: {
        ...mapState(
            'empresaModule', 
            ['empresas']
        )
    },
    methods: {
        ...mapActions(
            'empresaModule', 
            ['getEmpresas']
        )
    },
    mounted() {
        this.getEmpresas();
    },
}
</script>
