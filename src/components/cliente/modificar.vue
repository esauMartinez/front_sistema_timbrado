<template>
    <div class="container mt-5">
        <form-cliente @submit.prevent="putCliente(cliente)" id="form-cliente"></form-cliente>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-cliente" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import router from '../../router';
import formCliente from './form.vue'

export default {
    name: 'updateOperador',
    components: {
        formCliente
    },
    computed: {
        ...mapState('clienteModule', ['cliente'])
    },
    methods: {
        ...mapMutations('postalModule', ['setCodigosPostales']),
        ...mapActions('clienteModule', ['putCliente', 'getCliente']),
        cancelar() {
            this.setCodigosPostales([]);
            router.push('/cliente');
        }
    },
    mounted() {
        this.getCliente(this.$route.params.id)
    },
}
</script>