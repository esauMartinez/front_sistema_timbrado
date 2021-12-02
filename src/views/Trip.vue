<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-2 mb-3">
                <button class="btn btn btn-success me-3 w-100" @click="postTrip">
                    <font-awesome-icon icon="plus" />
                    Crear Trip
                </button>
                <!-- <router-link class="btn btn-success me-3 w-100" to="/crear-trip">
                    <font-awesome-icon icon="plus" />
                    Crear Trip  
                </router-link> -->
            </div>
            <div class="col-lg-3 mb-3">
                <select class="form-control" v-model="estatus" @change="getTrips(estatus)">
                    <option value="creado">Creados</option>
                    <option value="transito">Transito</option>
                    <option value="terminado">Terminados</option>
                    <option value="cancelado">Cancelados</option>
                </select>
            </div>
        </div>
        <table-trip :estatus="estatus"></table-trip>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import tableTrip from '../components/trip/table.vue'
export default {
    name: 'Timbre',
    components: {
        tableTrip
    },
    data() {
        return {
            estatus: 'creado'
        }
    },
    methods: {
        ...mapActions('tripModule', ['getTrips', 'postTrip']),
    },
    mounted() {
        this.getTrips('creado');
    },
}
</script>