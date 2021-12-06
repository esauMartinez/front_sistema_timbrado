<template>
    <div class="container mt-5">
         <div class="row" v-if="user_rol === 'USER_CLIENTE_SYSTEM'">
            <div class="col-lg-2 mb-3">
                <button class="btn btn btn-success me-3 w-100" @click="postCotizacion">
                    <font-awesome-icon icon="plus" />
                    Nueva Cotizacion
                </button>
            </div>
        </div>

        <table-cotizacion></table-cotizacion>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tableCotizacion from '../components/cotizacion/table.vue'
export default {
    name: 'Cotizacion',
    components: {
        tableCotizacion
    },
    computed: {
        ...mapState('usuarioModule', ['user_rol'])
    },
    methods: {
        ...mapActions('cotizacionModule', ['postCotizacion', 'getCotizaciones'])
    },
    mounted() {
        this.getCotizaciones();
    },
}
</script>