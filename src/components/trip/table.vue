<template>
     <div class="row">
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Trip</th>
                        <th>Fecha</th>
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
                        <td>{{ item.nombre_cliente }}</td>
                        <td>{{ item.nombre_operador }} {{ item.paterno }} {{ item.materno }}</td>
                        <td>{{ item.remolque }}</td>
                        <td>{{ item.unidad }}</td>
                        <td>{{ item.origen }}</td>
                        <td>{{ item.destino }}</td>
                        <td>
                            <div class="d-flex justify-content-around" v-if="(item.estatus !== 'cancelado' || user_rol === 'USER_ADMIN_SYSTEM') && (item.estatus !== 'terminado' || user_rol === 'USER_ADMIN_SYSTEM')">
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-trip/${item.id}` }" >
                                    <font-awesome-icon icon="pencil-alt" />
                                    Modificar
                                </router-link>
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
        }
    },
}
</script>