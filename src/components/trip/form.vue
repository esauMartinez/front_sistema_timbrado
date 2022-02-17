<template>

    <form class="mb-3">

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
                                <select class="form-control" v-model="trip.tipo_viaje" required
                                    :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'">
                                    <option value=""></option>
                                    <option value="nacional">Nacional</option>
                                    <option value="importacion">Importacion</option>
                                    <option value="exportacion">Exportacion</option>
                                </select>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label for="" class="form-label">Moneda <strong class="text-danger">(moneda en la que se que cobrara el viaje)</strong></label>
                                <select class="form-control" v-model="trip.moneda" required
                                    :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'">
                                    <option value=""></option>
                                    <option value="MXN">MXN</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label for="" class="form-label">Uso de CFDI</label>
                                <select class="form-control" v-model="trip.uso_CFDI" :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
                                    <option v-for="(item, index) in uso_cfdi" :key="index" :value="item.clave">{{ item.descripcion }}</option>
                                </select>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label for="" class="form-label">Metodo de Pago</label>
                                <select class="form-control" v-model="trip.metodo_pago" :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
                                    <option v-for="(item, index) in metodo_pago" :key="index" :value="item.clave">{{ item.descripcion }}</option>
                                </select>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label for="" class="form-label">Forma de Pago</label>
                                <select class="form-control" v-model="trip.forma_pago" :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
                                    <option v-for="(item, index) in forma_pago" :key="index" :value="item.clave">{{ item.descripcion }}</option>
                                </select>
                            </div>         
                            <div class="col-lg-6 mb-3">
                                <label for="" class="form-label">Fecha de salida</label>
                                <input type="datetime-local" class="form-control" v-model="trip.fecha_salida" 
                                        :disabled="trip.estatus !== 'creado'" required>
                            </div>         
                            <div class="col-lg-6 mb-3">
                                <label for="" class="form-label">Fecha de llegada</label>
                                <input type="datetime-local" class="form-control" v-model="trip.fecha_llegada" 
                                        :disabled="trip.estatus !== 'creado'" required>
                            </div>         
                            <div class="col-lg-12 mb-3">
                                <label for="" class="form-label">Kilometros</label>
                                <input type="text" class="form-control" v-model="trip.kilometros" 
                                        :disabled="trip.estatus !== 'creado'" required>
                            </div>         
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingDatosTrip">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseDatosTrip" aria-expanded="true" aria-controls="panelsStayOpen-collapseDatosTrip">
                        Datos del Trip
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseDatosTrip" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingDatosTrip">
                    <div class="accordion-body">
                        <div class="row">
                            <div :class="{ 'col-lg-5': trip.estatus === 'creado', 'col-lg-6': trip.estatus !== 'creado' || trip.tipo === 'cotizacion', 'mb-3': true }">
                                <label for="" class="form-label">Cliente</label>
                                <input type="text" class="form-control" v-model="trip.nombre_cliente" @keyup="getCliente(trip.nombre_cliente)"
                                        :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
                                <div class="list">
                                    <ul>
                                        <li v-for="(item, index) in clientes" :key="index" @click="setCliente(item)">
                                            <a>{{ item.razon_social }}</a>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-1 mt-4 mb-3" v-if="trip.estatus === 'creado' && trip.tipo === 'trip'">
                                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('clientes')">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>
                            <div :class="{ 'col-lg-5': trip.estatus === 'creado', 'col-lg-6': trip.estatus !== 'creado','mb-3': true }">
                                <label for="" class="form-label">Operador</label>
                                <input type="text" class="form-control" v-model="trip.nombre_operador" @keyup="getOperador(trip.nombre_operador)" 
                                        :disabled="trip.estatus !== 'creado'" required>
                                <div class="list">
                                    <ul>
                                        <li v-for="(item, index) in operadores" :key="index" @click="setOperador(item)">
                                            <a>{{ item.nombre }} {{ item.paterno }} {{ item.materno }}</a>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-1 mt-4 mb-3" v-if="trip.estatus === 'creado'">
                                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('operadores')">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>
                            <div :class="{ 'col-lg-5': trip.estatus === 'creado', 'col-lg-6': trip.estatus !== 'creado', 'mb-3': true }">
                                <label for="" class="form-label">Remolque</label>
                                <input type="text" class="form-control" v-model="trip.numero_economico_remolque" 
                                        :disabled="trip.estatus !== 'creado'" required>
                            </div>
                            <div class="col-lg-1 mt-4 mb-3" v-if="trip.estatus === 'creado'">
                                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('remolques')">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>
                            <div :class="{ 'col-lg-5': trip.estatus === 'creado', 'col-lg-6': trip.estatus !== 'creado','mb-3': true }">
                                <label for="" class="form-label">Unidad</label>
                                <input type="text" class="form-control" v-model="trip.numero_economico_unidad" 
                                        :disabled="trip.estatus !== 'creado'" required>
                            </div>
                            <div class="col-lg-1 mt-4 mb-3" v-if="trip.estatus === 'creado'">
                                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('unidades')">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOrigen">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOrigen" aria-expanded="true" aria-controls="panelsStayOpen-collapseOrigen">
                        Origen
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOrigen" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOrigen">
                    <div class="accordion-body">
                        <div class="row">
                            <div :class="{ 'col-lg-11': trip.estatus === 'creado' && trip.tipo === 'trip', 'col-lg-12': trip.estatus !== 'creado', 'mb-3': true }">
                                <label for="" class="form-label">Origen</label>
                                <input type="text" class="form-control" v-model="trip.nombre_origen" 
                                        :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
                            </div>
                            <div class="col-lg-1 mt-4 mb-3" v-if="trip.estatus === 'creado' && trip.tipo === 'trip'">
                                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('origen')">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Codigo Postal</label>
                                <input type="text" class="form-control" v-model="trip.origen_codigo_postal" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Colonia</label>
                                <input type="text" class="form-control" v-model="trip.origen_colonia" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Municipio</label>
                                <input type="text" class="form-control" v-model="trip.origen_municipio" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Estado</label>
                                <input type="text" class="form-control" v-model="trip.origen_estado" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Pais</label>
                                <input type="text" class="form-control" v-model="trip.origen_pais" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Numero Exterior</label>
                                <input type="text" class="form-control" v-model="trip.origen_exterior" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingDestino">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseDestino" aria-expanded="true" aria-controls="panelsStayOpen-collapseDestino">
                        Destino
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseDestino" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingDestino">
                    <div class="accordion-body">
                        <div class="row">
                            <div :class="{ 'col-lg-11': trip.estatus === 'creado' && trip.tipo === 'trip', 'col-lg-12': trip.estatus !== 'creado', 'mb-3': true }">
                                <label for="" class="form-label">Destino</label>
                                <input type="text" class="form-control" v-model="trip.nombre_destino" 
                                        :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
                            </div>
                            <div class="col-lg-1 mt-4 mb-3" v-if="trip.estatus === 'creado' && trip.tipo === 'trip'">
                                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('destino')">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>

                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Codigo Postal</label>
                                <input type="text" class="form-control" v-model="trip.destino_codigo_postal" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Colonia</label>
                                <input type="text" class="form-control" v-model="trip.destino_colonia" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Municipio</label>
                                <input type="text" class="form-control" v-model="trip.destino_municipio"  disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Estado</label>
                                <input type="text" class="form-control" v-model="trip.destino_estado" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Pais</label>
                                <input type="text" class="form-control" v-model="trip.destino_pais" disabled>
                            </div>
                            <div class="col-lg-4 mb-3" v-if="trip.tipo === 'cotizacion'">
                                <label for="" class="form-label">Numero Exterior</label>
                                <input type="text" class="form-control" v-model="trip.destino_exterior" disabled>
                            </div>
                        </div>
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
                            <div class="col-lg-12 d-flex justify-content-end" v-if="(trip.estatus === 'creado' && trip.tipo === 'trip')">
                                <button type="button" class="btn btn-info mb-3 w-25" @click="showModalConcepto">Agregar concepto</button>
                            </div>
                            <div class="col-lg-12">
                                <table-concepto :estatus="trip.estatus" :tipo="trip.tipo"></table-concepto>

                                <modal-concepto v-if="modal_concepto" :tipo="trip.tipo" :clave="trip.id"></modal-concepto>
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
                        <div class="col-lg-12 d-flex justify-content-end" v-if="(trip.estatus === 'creado' && trip.tipo === 'trip')">
                            <button type="button" class="btn btn-outline-danger mb-3 w-25 me-3" @click="deleteAllMercancias(trip.id)">Eliminar todas mercancias</button>
                            <button type="button" class="btn btn-info mb-3 w-25" @click="showModal">Agregar mercancia</button>
                        </div>
                        <div class="col-lg-12">
                            <tabla-mercancia :estatus="trip.estatus" :tipo="trip.tipo"></tabla-mercancia>

                            <modal-mercancia v-if="modal" :tipo="trip.tipo" :tipo_viaje="trip.tipo_viaje"></modal-mercancia>
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
                                <input type="text" class="form-control" :value="calcularSubtotal().toFixed(2)" :disabled="true">
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

        <modal-tables v-if="modalTables" :tableName="tableName"></modal-tables>

        <!-- <div class="row">
            <div class="col-lg-12 mb-3" v-if="user_rol === 'USER_ADMIN_SYSTEM'" @change="updateStatus(trip)">
                <label for="" class="form-label">Estatus</label>
                <select class="form-control" v-model="trip.estatus">
                    <option value="creado">Creado</option>
                    <option value="transito">Transito</option>
                    <option value="terminado">Terminado</option>
                </select>
            </div>            
        </div> -->
    </form>


</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import tablaMercancia from '../mercancia/table.vue'
import modalMercancia from '../mercancia/modal.vue'
import modalTables from './modal.vue'
import tableConcepto from '../concepto/table.vue'
import modalConcepto from '../concepto/modal.vue'


export default {
    name: 'formTrip',
    components: {
        tablaMercancia,
        modalMercancia,
        modalTables,
        tableConcepto,
        modalConcepto
    },
    props: {
        estatus: {
            type: String
        }
    },
    computed: {
        ...mapState('clienteModule', ['metodo_pago', 'uso_cfdi', 'forma_pago']),
        ...mapState('tripModule', ['trip', 'clientes', 'operadores', 'modal', 'tableName', 'modalTables']),
        ...mapState('conceptoModule', ['modal_concepto']),
        ...mapState('usuarioModule', ['user_rol']),
        ...mapState('operadorModule', ['operador']),
        ...mapState('clienteModule', ['cliente']),
        ...mapState('remolqueModule', ['remolque']),
        ...mapState('unidadModule', ['unidad']),
        ...mapState('patioModule', ['patio'])
    },
    methods: {
        ...mapActions('tripModule', ['getCliente', 'getOperador', 'updateStatus', 'deleteAllMercancias']),
        ...mapMutations('tripModule', ['setCliente', 'setOperador', 'showModal', 'showModalTable']),
        ...mapMutations('conceptoModule', ['showModalConcepto']),
        ...mapActions('conceptoModule', ['getConceptos']),
        ...mapGetters('conceptoModule', ['calcularTotal', 'calcularSubtotal', 'calcularIVA', 'calcularRetencion'])
    }
}
</script>

<style scoped>
    .list {
        /* position: absolute; */
        background: rgb(87, 87, 87);
    }

    .list ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .list ul li {
        display: flex;
    }

    .list ul li a {
        padding: 10px;
        cursor: pointer;
        color: #fff;
        width: 100%;
    }

    .list ul li a:hover {
        background: rgb(161, 161, 161);
    }
</style>