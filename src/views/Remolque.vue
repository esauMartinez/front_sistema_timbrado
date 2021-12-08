<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12 mb-3 d-flex justify-content-end">
                <router-link class="btn btn-primary me-3" to="/crear-remolque">
                    <font-awesome-icon icon="plus" />
                    Agregar remolque
                </router-link>
                <input type="text" class="form-control w-25" v-model="numero_economico" @keyup="searchRemolque(numero_economico)" placeholder="Buscar">
            </div>
        </div>
        <table-remolque></table-remolque>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import tableRemolque from '../components/remolque/table.vue'

export default {
    name: 'remolque',
    components: {
        tableRemolque
    },
    data() {
        return {
            numero_economico: ''
        }
    },
    methods: {
        ...mapMutations('remolqueModule',['searchRemolque'])
    }
}
</script>
