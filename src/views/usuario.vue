<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-2 mb-3">
                 <router-link class="btn btn-primary me-3" to="/crear-usuario">
                    <font-awesome-icon icon="plus" />
                    Crear Usuario
                </router-link>
            </div>
        </div>
        <table-usuario></table-usuario>
    </div>
</template>

<script>
import tableUsuario from '../components/usuario/table.vue'
export default {
    name: 'usuario',
    components: {
        tableUsuario
    }
}
</script>