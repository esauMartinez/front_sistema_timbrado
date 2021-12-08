<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12 mb-3 d-flex justify-content-end">
                <router-link class="btn btn-primary me-3" to="/crear-patio">
                    <font-awesome-icon icon="plus" />
                    Agregar Patio
                </router-link>
                <input type="text" class="form-control w-25" v-model="nombre" @keyup="searchPatio(nombre)" placeholder="Buscar">
            </div>
        </div>
        <tablePatio/>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import tablePatio from '../components/patio/table.vue'

export default {
    name: 'patio',
    components: {
        tablePatio
    },
    data() {
        return {
            nombre: ''
        }
    },
    methods: {
        ...mapMutations('patioModule', ['searchPatio'])
    }
}
</script>