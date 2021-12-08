<template>
    <div class="container mt-5">
        <form-operador @submit.prevent="putOperador(operador)" id="form-operador"></form-operador>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-operador" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapState } from 'vuex';
import router from '../../router';
import formOperador from './form.vue'

export default {
    name: 'updateOperador',
    components: {
        formOperador
    },
    computed: {
        ...mapState('operadorModule', ['operador'])
    },
    methods: {
        ...mapActions('operadorModule', ['putOperador', 'getOperador']),
        cancelar() {
            router.push('/operador');
        }
    },
    mounted() {
        this.getOperador(this.$route.params.id)
    },
}
</script>