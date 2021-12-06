<template>
     <div class="row">
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th>Trip</th>
                        <th>Fecha</th>
                        <th>Usuario Creo</th>
                        <th>Cliente</th>
                        <th>Operador</th>
                        <th>Remolque</th>
                        <th>Unidad</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in trips" :key="index" 
                        :class="{ 
                            'table-info': item.estatus === 'creado', 
                            'table-success': item.estatus === 'terminado', 
                            'table-danger': item.estatus === 'cancelado',
                            'table-warning': item.estatus === 'transito'
                    }">
                        <td>Trip - {{ item.id }}</td>
                        <td>{{ formatDate(item.fecha) }}</td>
                        <td>{{ item.usuario_creo_nombre }} {{ item.usuario_creo_paterno }} {{ item.usuario_creo_materno }}</td>
                        <td>{{ verifyData(item.nombre_cliente) }}</td>
                        <td>{{ verifyData(item.nombre_operador) }} {{ item.paterno }} {{ item.materno }}</td>
                        <td>{{ verifyData(item.remolque) }}</td>
                        <td>{{ verifyData(item.unidad) }}</td>
                        <td>{{ verifyData(item.origen) }}</td>
                        <td>{{ verifyData(item.destino) }}</td>
                        <td>
                            <div class="d-flex justify-content-around" 
                                v-if="(item.estatus !== 'cancelado' || user_rol === 'USER_ADMIN_SYSTEM') && (item.estatus !== 'terminado' || user_rol === 'USER_ADMIN_SYSTEM')">
                                <router-link class="btn btn-link" :to="{ path: `/modificar-trip/${item.id}` }" >
                                    <!-- <font-awesome-icon icon="pencil-alt" /> -->
                                    Modificar
                                </router-link>

                                <button class="btn btn-link text-danger" 
                                    v-if="(item.estatus !== 'terminado' && user_rol === 'USER_ADMIN_SYSTEM') && (item.estatus !== 'cancelado' && user_rol === 'USER_ADMIN_SYSTEM')"
                                    @click="updateStatus({ id: item.id, estatus: 'cancelado' })">
                                    <!-- <font-awesome-icon icon="pencil-alt" /> -->
                                    Cancelar Trip
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
    name: 'tableTrip',
    computed: {
        ...mapState('tripModule', ['trips']),
        ...mapState('usuarioModule', ['user_rol'])
    },
    methods: {
        formatDate(date) {
            return moment(date).format('YYYY/MM/DD HH:mm:ss')
        },
        verifyData(data) {
            if (data === '' || data === 0 || data === null) {
                return 'S/D';
            }
            return data;
        },
        ...mapActions('tripModule', ['updateStatus'])
    },
}
</script>