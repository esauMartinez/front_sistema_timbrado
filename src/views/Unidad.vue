<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12 mb-3 d-flex justify-content-end">
                <router-link class="btn btn-primary me-3" to="/crear-unidad">
                    <font-awesome-icon icon="plus"/>
                    Agregar Unidad
                </router-link>
                <input type="text" class="form-control w-25" v-model="numero_economico" @keyup="searchUnidad(numero_economico)" placeholder="Buscar">
            </div>
        </div>
        <tableUnidad/>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import tableUnidad from '../components/unidad/table.vue'

export default {
    name: 'unidad',
    components: {
        tableUnidad
    },
    data() {
        return {
            numero_economico: ''
        }
    },
    methods: {
        ...mapMutations('unidadModule',['searchUnidad']),
    }
}
</script>
