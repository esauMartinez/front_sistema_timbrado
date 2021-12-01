<template>
    <div class="container mt-5">
        <form-trip @submit.prevent="postTrip(trip)" id="form-trip" :estatus="false"></form-trip>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <font-awesome-icon icon="undo-alt" />
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-trip" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <font-awesome-icon icon="save" />
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import router from '../../router';
import formTrip from './form.vue'
import Trip from '../../classes/trip'

export default {
    name: 'createTrip',
    components: {
        formTrip
    },
    computed: {
        ...mapState('tripModule', ['trip'])
    },
    methods: {
        ...mapMutations('tripModule', ['setTrip']),
        ...mapActions('tripModule', ['postTrip']),
        cancelar() {
            router.push('/trip');
        }
    },
    mounted() {
        const trip = new Trip();
        this.setTrip(trip);
    },
}
</script>