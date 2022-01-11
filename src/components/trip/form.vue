<template>

    <form>
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

            <div :class="{ 
                    'col-lg-5': trip.estatus === 'creado' || ( trip.estatus === 'transito' && user_rol === 'USER_ADMIN_SYSTEM'), 
                    'col-lg-6': (trip.estatus === 'transito' && user_rol === 'USER_STD_SYSTEM') || trip.estatus === 'terminado' || trip.tipo === 'cotizacion',
                    'mb-3': true }"
            >
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
            <div 
                class="col-lg-1 mt-4 mb-3" 
                v-if="(trip.estatus === 'creado' && trip.tipo === 'trip') || (trip.estatus !== 'terminado' && trip.tipo === 'trip' && user_rol === 'USER_ADMIN_SYSTEM')"
            >
                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('clientes')">
                    <font-awesome-icon icon="plus" />
                </button>
            </div>
            <div :class="{ 
                    'col-lg-5': trip.estatus === 'creado' || ( trip.estatus === 'transito' && user_rol === 'USER_ADMIN_SYSTEM'), 
                    'col-lg-6': (trip.estatus === 'transito' && user_rol === 'USER_STD_SYSTEM') || trip.estatus === 'terminado',
                    'mb-3': true }"
            >
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
            <div 
                class="col-lg-1 mt-4 mb-3" 
                v-if="trip.estatus === 'creado' || (trip.estatus !== 'terminado' && user_rol === 'USER_ADMIN_SYSTEM')"
            >
                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('operadores')">
                    <font-awesome-icon icon="plus" />
                </button>
            </div>
            <div :class="{ 
                    'col-lg-5': trip.estatus === 'creado' || ( trip.estatus === 'transito' && user_rol === 'USER_ADMIN_SYSTEM'), 
                    'col-lg-6': (trip.estatus === 'transito' && user_rol === 'USER_STD_SYSTEM') || trip.estatus === 'terminado',
                    'mb-3': true }"
            >
                <label for="" class="form-label">Remolque</label>
                <input type="text" class="form-control" v-model="trip.numero_economico_remolque" 
                        :disabled="trip.estatus !== 'creado'" required>
            </div>
            <div 
                class="col-lg-1 mt-4 mb-3" 
                v-if="trip.estatus === 'creado' || (trip.estatus !== 'terminado' && user_rol === 'USER_ADMIN_SYSTEM')"
            >
                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('remolques')">
                    <font-awesome-icon icon="plus" />
                </button>
            </div>
            <div :class="{ 
                    'col-lg-5': trip.estatus === 'creado' || ( trip.estatus === 'transito' && user_rol === 'USER_ADMIN_SYSTEM'), 
                    'col-lg-6': (trip.estatus === 'transito' && user_rol === 'USER_STD_SYSTEM') || trip.estatus === 'terminado',
                    'mb-3': true }"
            >
                <label for="" class="form-label">Unidad</label>
                <input type="text" class="form-control" v-model="trip.numero_economico_unidad" 
                        :disabled="trip.estatus !== 'creado'" required>
            </div>
            <div 
                class="col-lg-1 mt-4 mb-3" 
                v-if="trip.estatus === 'creado' || (trip.estatus !== 'terminado' && user_rol === 'USER_ADMIN_SYSTEM')"
            >
                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('unidades')">
                    <font-awesome-icon icon="plus" />
                </button>
            </div>
            <div :class="{ 
                    'col-lg-5': trip.estatus === 'creado' || ( trip.estatus === 'transito' && user_rol === 'USER_ADMIN_SYSTEM'), 
                    'col-lg-6': (trip.estatus === 'transito' && user_rol === 'USER_STD_SYSTEM') || trip.estatus === 'terminado' || trip.tipo === 'cotizacion',
                    'mb-3': true }"
            >
                <label for="" class="form-label">Origen</label>
                <input type="text" class="form-control" v-model="trip.nombre_origen" 
                        :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
            </div>
            <div 
                class="col-lg-1 mt-4 mb-3" 
                v-if="(trip.estatus === 'creado' && trip.tipo === 'trip') || (trip.estatus !== 'terminado' && trip.tipo === 'trip' && user_rol === 'USER_ADMIN_SYSTEM')"
            >
                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('origen')">
                    <font-awesome-icon icon="plus" />
                </button>
            </div>
            <div :class="{ 
                    'col-lg-5': trip.estatus === 'creado' || ( trip.estatus === 'transito' && user_rol === 'USER_ADMIN_SYSTEM'), 
                    'col-lg-6': (trip.estatus === 'transito' && user_rol === 'USER_STD_SYSTEM') || trip.estatus === 'terminado' || trip.tipo === 'cotizacion',
                    'mb-3': true }"
            >
                <label for="" class="form-label">Destino</label>
                <input type="text" class="form-control" v-model="trip.nombre_destino" 
                        :disabled="trip.estatus !== 'creado' || trip.tipo === 'cotizacion'" required>
            </div>
            <div 
                class="col-lg-1 mt-4 mb-3" 
                v-if="(trip.estatus === 'creado' && trip.tipo === 'trip') || (trip.estatus !== 'terminado' && trip.tipo === 'trip' && user_rol === 'USER_ADMIN_SYSTEM')"
            >
                <button type="button" class="btn btn-primary mt-2 w-100" @click="showModalTable('destino')">
                    <font-awesome-icon icon="plus" />
                </button>
            </div>              
        </div>
        <div class="row" v-if="trip.tipo === 'cotizacion'">
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Codigo Postal</label>
                    <input type="text" class="form-control" v-model="trip.origen_codigo_postal" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Codigo Postal</label>
                    <input type="text" class="form-control" v-model="trip.destino_codigo_postal" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Colonia</label>
                    <input type="text" class="form-control" v-model="trip.origen_colonia" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Colonia</label>
                    <input type="text" class="form-control" v-model="trip.destino_colonia" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Municipio</label>
                    <input type="text" class="form-control" v-model="trip.origen_municipio" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Municipio</label>
                    <input type="text" class="form-control" v-model="trip.destino_municipio"  disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Estado</label>
                    <input type="text" class="form-control" v-model="trip.origen_estado" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Estado</label>
                    <input type="text" class="form-control" v-model="trip.destino_estado" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Pais</label>
                    <input type="text" class="form-control" v-model="trip.origen_pais" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Pais</label>
                    <input type="text" class="form-control" v-model="trip.destino_pais" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Numero Exterior</label>
                    <input type="text" class="form-control" v-model="trip.origen_exterior" disabled>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Numero Exterior</label>
                    <input type="text" class="form-control" v-model="trip.destino_exterior" disabled>
                </div>
        </div>

        <div class="row">
             <div class="col-lg-12 mb-3" v-if="user_rol === 'USER_ADMIN_SYSTEM'" @change="updateStatus(trip)">
                <label for="" class="form-label">Estatus</label>
                <select class="form-control" v-model="trip.estatus">
                    <option value="creado">Creado</option>
                    <option value="transito">Transito</option>
                    <option value="terminado">Terminado</option>
                </select>
            </div>
            <div class="col-lg-12 d-flex justify-content-end" v-if="trip.estatus === 'creado' || user_rol === 'USER_ADMIN_SYSTEM'">
                <button type="button" class="btn btn-info mb-3" @click="showModal">Agregar mercancia</button>
            </div>
            <div class="col-lg-12">
                <tabla-mercancia :estatus="trip.estatus" :tipo="trip.tipo"></tabla-mercancia>

                <modal-mercancia v-if="modal" :tipo="trip.tipo" :tipo_viaje="trip.tipo_viaje"></modal-mercancia>
            </div>
        </div>
        
        <modal-tables v-if="modalTables" :tableName="tableName"></modal-tables>

    </form>


</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import tablaMercancia from '../mercancia/table.vue'
import modalMercancia from '../mercancia/modal.vue'
import modalTables from './modal.vue'


export default {
    name: 'formTrip',
    components: {
        tablaMercancia,
        modalMercancia,
        modalTables
    },
    props: {
        estatus: {
            type: String
        }
    },
    computed: {
        ...mapState('tripModule', ['trip', 'clientes', 'operadores', 'modal', 'tableName', 'modalTables']),
        ...mapState('usuarioModule', ['user_rol']),
        ...mapState('operadorModule', ['operador']),
        ...mapState('clienteModule', ['cliente']),
        ...mapState('remolqueModule', ['remolque']),
        ...mapState('unidadModule', ['unidad']),
        ...mapState('patioModule', ['patio'])
    },
    methods: {
        ...mapActions('tripModule', ['getCliente', 'getOperador', 'updateStatus']),
        ...mapMutations('tripModule', ['setCliente', 'setOperador', 'showModal', 'showModalTable'])
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