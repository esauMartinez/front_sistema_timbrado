<template>
    <div class="container mt-5">
        <form id="form-cotizacion">

            <div class="row">
                <div class="col-lg-6">
                    <form-cotizacion :title="'Origen'" :patio="cotizacion.origen" :codigos="codigosOrigen" :ver="true"></form-cotizacion>
                </div> 
                <div class="col-lg-6">
                    <form-cotizacion :title="'Destino'" :patio="cotizacion.destino" :codigos="codigosDestino" :ver="true"></form-cotizacion>
                </div> 
            </div>

            <div class="row">
                <div class="col-lg-3 offset-lg-6 d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                        <font-awesome-icon icon="undo-alt" />
                        Regresar
                    </button>
                </div>
                <div class="col-lg-3 d-flex justify-content-end">
                    <button type="button" form="form-cotizacion" class="btn btn-success w-100" @click="aceptCotizacion(cotizacion.id)">
                        <font-awesome-icon icon="save" />
                        Aceptar Cotizacion
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../../router';
import formCotizacion from './form.vue'
export default {
    name: 'verCotizacion',
    components: {
        formCotizacion
    },
    computed: {
        ...mapState('cotizacionModule', ['cotizacion', 'codigosOrigen', 'codigosDestino'])
    },
    methods: {
        cancelar() {
            router.push('/cotizacion');
        },
        ...mapActions('cotizacionModule', ['getCotizacion', 'putCotizacion', 'aceptCotizacion'])
    },
    mounted() {
        this.getCotizacion(this.$route.params.id);
    },
}
</script>