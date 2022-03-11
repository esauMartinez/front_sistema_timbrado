<template>
    <div class="container-fluid">
        <div class="row">
            <div class="mb-3 my-flex-menu">
                <button 
                    class="btn btn-secondary button-menu" 
                    @click="postTrip">
                    Crear Nuevo Trip
                    <font-awesome-icon icon="plus" size="lg" />
                </button>
                <button                
                    v-for="({ title, type, icon }, index) in buttons"
                    :key="index"
                    :class="[ {'btn': true }, 'btn-secondary', 'button-menu' ]" 
                    @click="getTrips(type)">
                    {{ title }}
                    <font-awesome-icon :icon="icon" size="lg" />
                </button>
            </div>
        </div>

        <table-trip></table-trip>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tableTrip from '../components/trip/table.vue'
export default {
    name: 'Timbre',
    components: {
        tableTrip
    },
    data() {
        return {
            buttons: [
                { color: 'btn-info', type: 'creado', title: 'Trips creados', icon: 'truck' },
                { color: 'btn-warning', type: 'transito', title: 'Trips en transito', icon: 'road' },
                { color: 'btn-success', type: 'terminado', title: 'Trips terminados', icon: 'truck-loading' },
                { color: 'btn-danger', type: 'cancelado', title: 'Trips cancelados', icon: 'ban' },
            ]
        }
    },
    computed: {
        estatus: {
            get() {
                return this.estatusTrip
            },
            set(value) {
                this.$store.commit('tripModule/setEstatus', value)
            }
        },
        ...mapState(
            'tripModule', 
            [ 'estatusTrip' ]
        )
    },
    methods: {
        ...mapActions(
            'tripModule', 
            [ 'getTrips', 'postTrip' ]
        )
    },
    mounted() {
        this.getTrips(this.estatus);
    },
}
</script>

<style scoped>
    .my-flex-menu {
        display: flex;
        justify-content: center;
    }
</style>