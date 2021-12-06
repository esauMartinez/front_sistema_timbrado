<template>
     <div class="container mt-5">
         <form-usuario @submit.prevent="postUsuario(usuario)" id="form-usuario" :usuario="usuario"></form-usuario>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <font-awesome-icon icon="undo-alt" />
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-usuario" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <font-awesome-icon icon="save" />
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import router from '../../router'
import formUsuario from './form.vue'
import Usuario from '../../classes/usuario'
export default {
    name: 'crearUsuario',
    components: {
        formUsuario
    },
    computed: {
        ...mapState('usuarioModule', ['usuario'])
    },
    methods: {
        ...mapMutations('usuarioModule', ['setUsuario']),
        ...mapActions('usuarioModule', ['postUsuario']),
        cancelar() {           
            router.push('/usuario');
        }
    },
    mounted() {
        const usuario = new Usuario();
        this.setUsuario(usuario);
    },
}
</script>