<template>
    <div class="container">
         <div class="row" v-if="user_rol === 'USER_CLIENTE_SYSTEM'">
            <div class="col-lg-2 mb-3">
                <button class="btn btn btn-success me-3 w-100" @click="postCotizacion">
                    <font-awesome-icon icon="plus" />
                    Nueva Cotizacion
                </button>
            </div>
            <div class="col-lg-3 mb-3" v-if="user_rol === 'USER_CLIENTE_SYSTEM'">
                <select class="form-control" v-model="estatus" @change="getCotizaciones(estatus)">
                    <option value="creada">Creadas</option>
                    <option value="enviada">Enviadas</option>
                    <option value="cotizada">Cotizadas</option>
                    <option value="autorizada">Autorizadas</option>
                </select>
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
        ...mapState('usuarioModule', ['user_rol']),
        ...mapState('cotizacionModule', ['estatusCotizacion']),
        estatus: {
            get() {
                return this.estatusCotizacion
            },
            set(value) {
                this.$store.commit('cotizacionModule/setEstatus', value)
            }
        },
    },
    methods: {
        ...mapActions('cotizacionModule', ['postCotizacion', 'getCotizaciones'])
    },
    mounted() {

        let estatus = this.estatus;

        if (this.user_rol === 'USER_ADMIN_SYSTEM' || this.user_rol === 'USER_STD_SYSTEM' ) {
            estatus = 'enviada';
        }
        this.getCotizaciones(estatus);
    },
}
</script>