<template>
    <div class="container">
        <form id="form-cotizacion" @submit.prevent="putCotizacion(cotizacion)">


            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTipoViaje">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTipoViaje" aria-expanded="true" aria-controls="panelsStayOpen-collapseTipoViaje">
                            Tipo de viaje
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTipoViaje" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTipoViaje">
                        <div class="accordion-body">
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
                                <div class="col-lg-4 mb-3">
                                    <label for="" class="form-label">Uso de CFDI</label>
                                    <select class="form-control" v-model="cotizacion.uso_CFDI" :disabled="cotizacion.estatus !== 'creada'" required>
                                        <option v-for="(item, index) in uso_cfdi" :key="index" :value="item.clave">{{ item.descripcion }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="" class="form-label">Metodo de Pago</label>
                                    <select class="form-control" v-model="cotizacion.metodo_pago" :disabled="cotizacion.estatus !== 'creada'" required>
                                        <option v-for="(item, index) in metodo_pago" :key="index" :value="item.clave">{{ item.descripcion }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="" class="form-label">Forma de Pago</label>
                                    <select class="form-control" v-model="cotizacion.forma_pago" :disabled="cotizacion.estatus !== 'creada'" required>
                                        <option v-for="(item, index) in forma_pago" :key="index" :value="item.clave">{{ item.descripcion }}</option>
                                    </select>
                                </div>            
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingDatosTrip">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseDatosTrip" aria-expanded="true" aria-controls="panelsStayOpen-collapseDatosTrip">
                            Origen
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseDatosTrip" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingDatosTrip">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <form-cotizacion :title="'Origen'" :patio="cotizacion.origen" :codigos="codigosOrigen" :ver="false" :show="origen"></form-cotizacion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingConceptos">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseConceptos" aria-expanded="false" aria-controls="panelsStayOpen-collapseConceptos">
                            Destino
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseConceptos" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingConceptos">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <form-cotizacion :title="'Destino'" :patio="cotizacion.destino" :codigos="codigosDestino" :ver="false" :show="destino"></form-cotizacion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingMercancias">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseMercancias" aria-expanded="false" aria-controls="panelsStayOpen-collapseMercancias">
                            Mercancias
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseMercancias" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingMercancias">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-outline-danger mb-3 w-25 me-3" @click="deleteAllMercanciasCotizacion(cotizacion.id)">Eliminar todas mercancias</button>
                                    <button type="button" class="btn btn-info mb-3 w-25" @click="showModal">Agregar mercancia</button>
                                </div>
                                <div class="col-lg-12">
                                    <tabla-mercancia  :estatus="cotizacion.estatus" :tipo="'cotizacion'"></tabla-mercancia>

                                    <modal-mercancia v-if="modal" :tipo="'cotizacion'" :tipo_viaje="cotizacion.tipo_viaje"></modal-mercancia>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingCosto">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseCosto" aria-expanded="false" aria-controls="panelsStayOpen-collapseCosto">
                            Costos
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseCosto" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingCosto">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-lg-12 mb-3">
                                    <label for="" class="form-label">Costo Viaje</label>
                                    <input type="text" class="form-control" v-model="cotizacion.costo_viaje" :disabled="cotizacion.estatus !== 'enviada'">
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>


            <div class="row mt-3">
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
import { mapActions, mapState, mapMutations } from 'vuex'
import router from '../../router';
import tablaMercancia from '../mercancia/table.vue'
import modalMercancia from '../mercancia/modal.vue'
import formCotizacion from './form.vue'
import tableConcepto from '../concepto/table.vue'
import modalConcepto from '../concepto/modal.vue'
export default {
    name: 'modificarCotizacion',
    components: {
        formCotizacion,
        tablaMercancia, 
        modalMercancia,
        tableConcepto,
        modalConcepto
    },
    data() {
        return {
            origen: true,
            destino: true
        }
    },
    computed: {
        ...mapState('clienteModule', ['metodo_pago', 'uso_cfdi', 'forma_pago']),
        ...mapState('cotizacionModule', ['cotizacion', 'codigosOrigen', 'codigosDestino']),
        ...mapState('tripModule', ['modal']),
        ...mapState('conceptoModule', ['modal_concepto']),
    },
    methods: {
        cancelar() {
            router.push('/cotizacion');
        },
        ...mapMutations('tripModule', ['showModal']),
        ...mapMutations('conceptoModule', ['showModalConcepto']),
        ...mapActions('cotizacionModule', ['getCotizacion', 'putCotizacion', 'deleteAllMercanciasCotizacion']),
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