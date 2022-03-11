<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-2 mb-3">
                 <router-link 
                    class="btn btn-primary me-3" 
                    to="/crear-usuario">
                    Crear Usuario
                </router-link>
            </div>
        </div>
        <table-usuario 
            :empresa="empresa" 
            :user_rol="user_rol">
        </table-usuario>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import tableUsuario from '../components/usuario/table.vue'
export default {
    name: 'usuario',
    components: {
        tableUsuario
    },
    data() {
        return {
            empresa: null
        }
    },
    computed: {
        ...mapState(
            'usuarioModule', 
            [ 'user_rol' ]
        ),
    },
    beforeMount() {
        const { empresa } = JSON.parse(localStorage.getItem('usuario'));
        this.empresa = empresa;
    },
}
</script>