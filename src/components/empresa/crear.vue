<template>
    <div class="container mt-5">
        <form-empresa @submit.prevent="postEmpresa(empresa)" id="form-empresa"></form-empresa>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-empresa" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Empresa from '../../classes/empresa';
import router from '../../router';
import formEmpresa from './form.vue'

export default {
    name: 'creteEmpresa',
    components: {
        formEmpresa
    },
    computed: {
        ...mapState('empresaModule', ['empresa'])
    },
    methods: {
        cancelar() {
            router.push('/root');
        },
        ...mapActions('empresaModule', ['postEmpresa']),
        ...mapMutations('empresaModule', ['setEmpresa'])
    },
    mounted() {
        const empresa = new Empresa();
        this.setEmpresa(empresa);
    },
}
</script>