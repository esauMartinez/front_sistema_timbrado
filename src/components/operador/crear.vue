<template>
    <div class="container mt-5">
        <form-operador @submit.prevent="postOperador(operador)" id="form-operador"></form-operador>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <font-awesome-icon icon="undo-alt" />
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-operador" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <font-awesome-icon icon="save" />
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import router from '../../router';
import formOperador from './form.vue'
import Operador from '../../classes/operador'

export default {
    name: 'createOperador',
    components: {
        formOperador
    },
    computed: {
        ...mapState('operadorModule', ['operador'])
    },
    methods: {
        ...mapMutations('operadorModule', ['setOperador']),
        ...mapActions('operadorModule', ['postOperador']),
        cancelar() {            
            router.push('/operador');
        }
    },
    mounted() {
        const operador = new Operador();
        this.setOperador(operador);
    },
}
</script>