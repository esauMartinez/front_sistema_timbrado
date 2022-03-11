<template>
    <div class="container">
         <div class="row" v-if="user_rol === 'USER_CLIENTE_SYSTEM'">
             <div class="mb-3 my-flex-menu">
                <button 
                    class="btn btn-secondary button-menu" 
                    @click="postCotizacion">
                    Crear una otizacion
                    <!-- <font-awesome-icon icon="plus" size="lg" /> -->
                </button>
                <button                
                    v-for="({ title, type, icon }, index) in buttons"
                    :key="index"
                    :class="[ {'btn': true }, 'btn-secondary', 'button-menu' ]" 
                    @click="getCotizaciones(type)">
                    {{ title }}
                    <!-- <font-awesome-icon :icon="icon" size="lg" /> -->
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
    data() {
        return {
              buttons: [
                { type: 'creada', title: 'Cotizaciones creadas', icon: 'truck' },
                { type: 'enviada', title: 'Cotizaciones en enviadas', icon: 'road' },
                { type: 'cotizada', title: 'Cotizaciones cotizadas', icon: 'truck-loading' },
                { type: 'autorizada', title: 'Cotizaciones autorizadas', icon: 'ban' },
            ]
        }
    },
    computed: {
        ...mapState(
            'usuarioModule', 
            [ 'user_rol' ]
        ),
        ...mapState(
            'cotizacionModule', 
            [ 'estatusCotizacion' ]
        ),
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

<style scoped>
    .my-flex-menu {
        display: flex;
        justify-content: center;
    }
</style>