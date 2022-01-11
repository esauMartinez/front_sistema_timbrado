<template>
    <div class="container mt-5">
        <form id="form-cotizacion" @submit.prevent="cotizar(cotizacion)">

            <div class="row">
                <div class="col-lg-6">
                    <form-cotizacion :title="'Origen'" 
                                    :color="'text-danger'" 
                                    :patio="cotizacion.origen" 
                                    :codigos="codigosOrigen" 
                                    :ver="true"
                                    :show="(cotizacion.tipo_viaje === 'nacional' || cotizacion.tipo_viaje === 'exportacion') ? true : false"></form-cotizacion>
                </div> 
                <div class="col-lg-6">
                    <form-cotizacion :title="'Destino'" 
                                    :color="'text-primary'" 
                                    :patio="cotizacion.destino" 
                                    :codigos="codigosDestino" 
                                    :ver="true"
                                    :show="(cotizacion.tipo_viaje === 'nacional' || cotizacion.tipo_viaje === 'importacion') ? true : false"></form-cotizacion>
                </div> 
                <div class="col-lg-12 mb-3">
                    <label for="" class="form-label">Costo Viaje</label>
                    <input type="text" class="form-control" v-model="cotizacion.costo_viaje" :disabled="cotizacion.estatus !== 'enviada'">
                </div>
                <div class="col-lg-12">
                    <tabla-mercancia  :estatus="cotizacion.estatus" :tipo="'cotizacion'"></tabla-mercancia>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 offset-lg-6 d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                        <!-- <font-awesome-icon icon="undo-alt" /> -->
                        Regresar
                    </button>
                </div>
                <div class="col-lg-3 d-flex justify-content-end">
                    <button v-if="cotizacion.estatus === 'enviada' || cotizacion.estatus === 'creada' " type="submit" form="form-cotizacion" class="btn btn-warning w-100">
                        <font-awesome-icon icon="save" />
                        Enviar Cotizacion
                    </button>
                    <button v-if="cotizacion.estatus === 'cotizada'" type="button" form="form-cotizacion" class="btn btn-success w-100" @click="autorizar(cotizacion.id)">
                        <!-- <font-awesome-icon icon="save" /> -->
                        Autorizar
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
import tablaMercancia from '../mercancia/table.vue'
export default {
    name: 'verCotizacion',
    components: {
        formCotizacion,
        tablaMercancia
    },
    computed: {
        ...mapState('cotizacionModule', ['cotizacion', 'codigosOrigen', 'codigosDestino'])
    },
    methods: {
        cancelar() {
            router.push('/cotizacion');
        },
        ...mapActions('cotizacionModule', ['getCotizacion', 'cotizar', 'autorizar'])
    },
    mounted() {
        this.getCotizacion(this.$route.params.id);
    },
}
</script>