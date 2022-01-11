<template>
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Fecha</th>
                <!-- <th v-if="user_rol === 'USER_CLIENTE_SYSTEM'">Estatus</th> -->
                <th v-if="user_rol !== 'USER_CLIENTE_SYSTEM'">Cliente</th>
                <th>Origen</th>
                <th>Destino</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cotizaciones" 
                :key="index" 
                :class="{ 'hide': (item.estatus === 'creada' && user_rol !== 'USER_CLIENTE_SYSTEM') || item.estatus === 'aceptada' }">
                <td>{{ formatDate(item.fecha) }}</td>
                <!-- <td v-if="user_rol === 'USER_CLIENTE_SYSTEM'">{{ item.estatus }}</td> -->
                <td v-if="user_rol !== 'USER_CLIENTE_SYSTEM'">{{ item.razon_social }}</td>
                <td>{{ item.origen_nombre }}</td>
                <td>{{ item.destino_nombre }}</td>
                <td>
                    <div class="d-flex justify-content-around">
                        <router-link 
                            class="btn btn-warning" 
                            :to="{ path: `/llenar-cotizacion/${item.id}` }" 
                            v-if="item.estatus === 'creada' && user_rol === 'USER_CLIENTE_SYSTEM'">
                            <!-- <font-awesome-icon icon="pencil-alt" /> -->
                            Llenar Cotizacion
                        </router-link>

                        <p v-if="item.estatus === 'enviada' && user_rol === 'USER_CLIENTE_SYSTEM'">Solicitud Enviada</p>
                        <p v-if="item.estatus === 'contestada' && user_rol === 'USER_CLIENTE_SYSTEM'">Solicitud Cotizada</p>

                        <router-link  
                            v-if="user_rol !== 'USER_CLIENTE_SYSTEM' || item.estatus === 'cotizada'" 
                            class="btn btn-info" :to="{ path: `/ver-cotizacion/${item.id}` }">
                            <!-- <font-awesome-icon icon="pencil-alt" /> -->
                            Ver  Cotizacion
                        </router-link>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    name: 'tableCotizacion',
    computed: {
        ...mapState('cotizacionModule', ['cotizaciones']),
        ...mapState('usuarioModule', ['user_rol'])
    },
    methods: {
        formatDate(date) {
            return moment(date).format('YYYY/MM/DD HH:mm:ss')
        },
    },
}
</script>

<style scoped>
    p {
        padding: 0;
        margin: 0;
    }

    .hide {
        display: none;
    }
</style>