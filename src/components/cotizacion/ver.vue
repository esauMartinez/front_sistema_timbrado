<template>
    <div class="container">
        <form id="form-cotizacion" @submit.prevent="cotizar(cotizacion)">

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
                                    <select class="form-control" v-model="cotizacion.tipo_viaje" @change="tipoViaje(cotizacion.tipo_viaje)" required disabled>
                                        <option value=""></option>
                                        <option value="nacional">Nacional</option>
                                        <option value="importacion">Importacion</option>
                                        <option value="exportacion">Exportacion</option>
                                    </select>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="" class="form-label">Moneda <strong class="text-danger">(moneda en la que se que cobrara el viaje)</strong></label>
                                    <select class="form-control" v-model="cotizacion.moneda" required disabled>
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
                            <form-cotizacion :title="'Origen'" 
                                            :color="'text-danger'" 
                                            :patio="cotizacion.origen" 
                                            :codigos="codigosOrigen" 
                                            :ver="true"
                                            :show="(cotizacion.tipo_viaje === 'nacional' || cotizacion.tipo_viaje === 'exportacion') ? true : false"></form-cotizacion>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingDestino">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseDestino" aria-expanded="false" aria-controls="panelsStayOpen-collapseDestino">
                            Destino
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseDestino" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingDestino">
                        <div class="accordion-body">
                            <form-cotizacion :title="'Destino'" 
                                            :color="'text-primary'" 
                                            :patio="cotizacion.destino" 
                                            :codigos="codigosDestino" 
                                            :ver="true"
                                            :show="(cotizacion.tipo_viaje === 'nacional' || cotizacion.tipo_viaje === 'importacion') ? true : false"></form-cotizacion>
                        </div>
                    </div>
                </div>
                 <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingConceptos">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseConceptos" aria-expanded="false" aria-controls="panelsStayOpen-collapseConceptos">
                            Conceptos
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseConceptos" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingConceptos">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-lg-12 d-flex justify-content-end" v-if="cotizacion.estatus === 'enviada'">
                                    <button type="button" class="btn btn-info mb-3 w-25" @click="showModalConcepto">Agregar concepto</button>
                                </div>
                                <div class="col-lg-12">
                                    <table-concepto :estatus="cotizacion.estatus" :tipo="'cotizacion'"></table-concepto>

                                    <modal-concepto v-if="modal_concepto" :tipo="'cotizacion'" :clave="cotizacion.id"></modal-concepto>
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
                                <div class="col-lg-12">
                                    <tabla-mercancia  :estatus="cotizacion.estatus" :tipo="'cotizacion'"></tabla-mercancia>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingCosto">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseCosto" aria-expanded="false" aria-controls="panelsStayOpen-collapseCosto">
                            Costo
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseCosto" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingCosto">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-lg-3 mb-3">
                                    <label for="" class="form-label">Subtotal</label>
                                    <input v-if="cotizacion.estatus === 'creada'" type="text" class="form-control" v-model="cotizacion.costo_viaje" :disabled="true">
                                    <input v-else type="text" class="form-control" :value="calcularSubtotal().toFixed(2)" :disabled="true">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="" class="form-label">IVA</label>
                                    <input type="text" class="form-control" :value="calcularIVA().toFixed(2)" :disabled="true">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="" class="form-label">Retencion</label>
                                    <input type="text" class="form-control" :value="calcularRetencion().toFixed(2)" :disabled="true">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="" class="form-label">Total</label>
                                    <input type="text" class="form-control" :value="calcularTotal().toFixed(2)" :disabled="true">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
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
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import router from '../../router';
import formCotizacion from './form.vue'
import tablaMercancia from '../mercancia/table.vue'
import tableConcepto from '../concepto/table.vue'
import modalConcepto from '../concepto/modal.vue'
export default {
    name: 'verCotizacion',
    components: {
        formCotizacion,
        tablaMercancia,
        tableConcepto,
        modalConcepto
    },
    computed: {
        ...mapState('clienteModule', ['metodo_pago', 'uso_cfdi', 'forma_pago']),
        ...mapState('cotizacionModule', ['cotizacion', 'codigosOrigen', 'codigosDestino']),
        ...mapState('conceptoModule', ['modal_concepto', 'conceptos'])
    },
    methods: {
        cancelar() {
            router.push('/cotizacion');
        },
        // ...mapGetters('cotizacionModule', ['calcularCosto']),
        ...mapMutations('conceptoModule', ['showModalConcepto']),
        ...mapActions('cotizacionModule', ['getCotizacion', 'cotizar', 'autorizar']),
        ...mapGetters('conceptoModule', ['calcularCosto', 'calcularTotal', 'calcularSubtotal', 'calcularIVA', 'calcularRetencion'])
    },
    mounted() {
        this.getCotizacion(this.$route.params.id);
    },
}
</script>