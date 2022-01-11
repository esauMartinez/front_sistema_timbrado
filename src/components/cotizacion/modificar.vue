<template>
    <div class="container mt-5">
        <form id="form-cotizacion" @submit.prevent="putCotizacion(cotizacion)">

            <div class="row">
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Tipo de Viaje</label>
                    <select class="form-control" v-model="cotizacion.tipo_viaje" @change="tipoViaje(cotizacion.tipo_viaje)" required>
                        <option value=""></option>
                        <option value="nacional">Nacional</option>
                        <option value="importacion">Importacion</option>
                        <option value="exportacion">Exportacion</option>
                    </select>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Moneda <strong class="text-danger">(moneda en la que se que cobrara el viaje)</strong></label>
                    <select class="form-control" v-model="cotizacion.moneda" required>
                        <option value=""></option>
                        <option value="MXN">MXN</option>
                        <option value="USD">USD</option>
                    </select>
                </div>

                <div class="col-lg-12">
                    <form-cotizacion :title="'Origen'" :patio="cotizacion.origen" :codigos="codigosOrigen" :ver="false" :show="origen"></form-cotizacion>
                </div>
                <div class="col-lg-12">
                    <hr>
                </div>
                <div class="col-lg-12">
                    <form-cotizacion :title="'Destino'" :patio="cotizacion.destino" :codigos="codigosDestino" :ver="false" :show="destino"></form-cotizacion>
                </div> 
                <div class="col-lg-12 d-flex justify-content-end">
                    <button type="button" class="btn btn-info mb-3" @click="showModal">Agregar mercancia</button>
                </div>
                <div class="col-lg-12">
                    <tabla-mercancia  :estatus="cotizacion.estatus" :tipo="'cotizacion'"></tabla-mercancia>

                    <modal-mercancia v-if="modal" :tipo="'cotizacion'" :tipo_viaje="cotizacion.tipo_viaje"></modal-mercancia>
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
import tablaMercancia from '../mercancia/table.vue'
import modalMercancia from '../mercancia/modal.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import router from '../../router';
import formCotizacion from './form.vue'
export default {
    name: 'modificarCotizacion',
    components: {
        formCotizacion,
        tablaMercancia, 
        modalMercancia
    },
    data() {
        return {
            origen: true,
            destino: true
        }
    },
    computed: {
        ...mapState('cotizacionModule', ['cotizacion', 'codigosOrigen', 'codigosDestino']),
        ...mapState('tripModule', ['modal'])
    },
    methods: {
        cancelar() {
            router.push('/cotizacion');
        },
        ...mapMutations('tripModule', ['showModal']),
        ...mapActions('cotizacionModule', ['getCotizacion', 'putCotizacion']),
        tipoViaje(tipo_viaje) {
            if (tipo_viaje === 'importacion') {
                this.origen = false;
                this.destino = true;
                console.log(this.cotizacion.origen);

                this.cotizacion.origen.colonia = 'N/A';
                this.cotizacion.origen.c_colonia = 'N/A';
                this.cotizacion.origen.municipio = 'N/A';
                this.cotizacion.origen.c_municipio = 'N/A';
                this.cotizacion.origen.pais = 'Estados Unidos';
                this.cotizacion.origen.c_pais = 'USA';
                this.cotizacion.origen.localidad = 'N/A';
            } else if (tipo_viaje === 'exportacion') {
                this.origen = true;
                this.destino = false;

                this.cotizacion.destino.colonia = 'N/A';
                this.cotizacion.destino.c_colonia = 'N/A';
                this.cotizacion.destino.municipio = 'N/A';
                this.cotizacion.destino.c_municipio = 'N/A';
                this.cotizacion.destino.pais = 'Estados Unidos';
                this.cotizacion.destino.c_pais = 'USA';
                this.cotizacion.destino.localidad = 'N/A';
            } else {
                this.origen = true;
                this.destino = true;
            }
        }
    },
    mounted() {
        this.getCotizacion(this.$route.params.id);
    },
}
</script>