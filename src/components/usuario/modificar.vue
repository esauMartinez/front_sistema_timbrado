<template>
     <div class="container mt-5">
         <form-usuario @submit.prevent="putUsuario(usuario)" id="form-usuario" :usuario="usuario"></form-usuario>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <font-awesome-icon icon="undo-alt" />
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-usuario" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <font-awesome-icon icon="save" />
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../../router'
import formUsuario from './form.vue'
export default {
    name: 'modificarUsuario',
    components: {
        formUsuario
    },
    computed: {
        ...mapState('usuarioModule', ['usuario'])
    },
    methods: {
        ...mapActions('usuarioModule', ['getUsuario', 'putUsuario']),
        cancelar() {           
            router.push('/usuario');
        }
    },
    mounted() {
        this.getUsuario(this.$route.params.id);
    },
}
</script>