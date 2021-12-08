<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12 mb-3 d-flex justify-content-end">
                <router-link class="btn btn-primary me-3" to="/crear-operador">
                    <font-awesome-icon icon="plus" />
                    Crear Operador
                </router-link>
                <input type="text" class="form-control w-25" v-model="nombre" @keyup="searchOperador(nombre)" placeholder="Buscar">
            </div>
        </div>
        <table-operador></table-operador>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import tableOperador from '../components/operador/table.vue'
export default {
    name: 'operador',
    components: {
        tableOperador
    },
    data() {
        return {
            nombre: ''
        }
    },
    methods: {
        ...mapMutations('operadorModule', ['searchOperador'])
    },
}
</script>