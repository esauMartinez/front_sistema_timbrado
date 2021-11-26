<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12 mb-3 d-flex justify-content-end">
                <router-link class="btn btn-primary me-3" to="/form-cliente">Crear Cliente</router-link>
                <input type="text" class="form-control w-25" v-model="razon_social" @keyup="searchCliente(razon_social)" placeholder="Buscar">
            </div>
        </div>
        <table-cliente></table-cliente>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import tableCliente from '../components/cliente/table'

export default {
    name: 'Cliente',
    components: {
        tableCliente
    },
    data() {
        return {
            razon_social: ''
        }
    },
    methods: {
        ...mapMutations('clienteModule', ['searchCliente'])
    },
}
</script>