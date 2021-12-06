<template>
    <form>
        <div class="row">
            <div class="col-lg-6 mb-3" v-if="!cliente">
                <label for="" class="form-label">Cliente</label>
                <input type="text" class="form-control" v-model="trip.nombre_cliente" @keyup="getCliente(trip.nombre_cliente)"
                        :disabled="trip.estatus !== 'creado'" required>
                <div class="list">
                    <ul>
                        <li v-for="(item, index) in clientes" :key="index" @click="setCliente(item)">
                            <a>{{ item.razon_social }}</a>
                        </li> 
                    </ul>
                </div>
            </div>
            <div class="col-lg-6 mb-3" v-if="!cliente">
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
            <div class="col-lg-6 mb-3" v-if="!cliente">
                <label for="" class="form-label">Remolque</label>
                <input type="text" class="form-control" v-model="trip.remolque" 
                        :disabled="trip.estatus !== 'creado'" required>
            </div>
            <div class="col-lg-6 mb-3" v-if="!cliente">
                <label for="" class="form-label">Unidad</label>
                <input type="text" class="form-control" v-model="trip.unidad" 
                        :disabled="trip.estatus !== 'creado'" required>
            </div>
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Origen</label>
                <input type="text" class="form-control" v-model="trip.origen" 
                        :disabled="trip.estatus !== 'creado'" required>
            </div>
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Destino</label>
                <input type="text" class="form-control" v-model="trip.destino" 
                        :disabled="trip.estatus !== 'creado'" required>
            </div>                
            <div class="col-lg-12 mb-3" v-if="user_rol === 'USER_ADMIN_SYSTEM'" @change="updateStatus(trip)">
                <label for="" class="form-label">Estatus</label>
                <select class="form-control" v-model="trip.estatus">
                    <option value="creado">Creado</option>
                    <option value="transito">Transito</option>
                    <option value="terminado">Terminado</option>
                </select>
            </div>
            <div class="col-lg-12 d-flex justify-content-end" v-if="trip.estatus === 'creado'">
                <button type="button" class="btn btn-info mb-3" @click="showModal">Agregar mercancia</button>
            </div>
            <div class="col-lg-12">
                <tabla-mercancia :estatus="trip.estatus"></tabla-mercancia>

                <modal-mercancia v-if="modal"></modal-mercancia>
            </div>               
        </div>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import tablaMercancia from '../mercancia/table.vue'
import modalMercancia from '../mercancia/modal.vue'

export default {
    name: 'formTrip',
    components: {
        tablaMercancia,
        modalMercancia
    },
    props: {
        estatus: {
            type: String
        }
    },
    computed: {
        ...mapState('tripModule', ['trip', 'clientes', 'operadores', 'modal']),
        ...mapState('usuarioModule', ['user_rol'])
    },
    methods: {
        ...mapMutations('tripModule', ['setCliente', 'setOperador', 'showModal']),
        ...mapActions('tripModule', ['getCliente', 'getOperador', 'updateStatus']),
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