<template>
    <div class="container mt-5">
        <form id="form-cotizacion" @submit.prevent="putCotizacion(cotizacion)">

            <div class="row">
                <div class="col-lg-6">
                    <form-cotizacion :title="'Origen'" :patio="cotizacion.origen" :codigos="codigosOrigen" :ver="false"></form-cotizacion>
                </div> 
                <div class="col-lg-6">
                    <form-cotizacion :title="'Destino'" :patio="cotizacion.destino" :codigos="codigosDestino" :ver="false"></form-cotizacion>
                </div> 
            </div>

            <div class="row">
                <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                        <!-- <font-awesome-icon icon="undo-alt" /> -->
                        Cancelar
                    </button>
                </div>
                <div class="col-lg-2 d-flex justify-content-end">
                    <button type="submit" form="form-cotizacion" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                        <!-- <font-awesome-icon icon="save" /> -->
                        Guardar
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
    name: 'modificarCotizacion',
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
        ...mapActions('cotizacionModule', ['getCotizacion', 'putCotizacion'])
    },
    mounted() {
        this.getCotizacion(this.$route.params.id);
    },
}
</script>