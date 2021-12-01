<template>
    <div class="container mt-5">
        <form-trip @submit.prevent="putTrip(trip)" id="form-trip"></form-trip>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <font-awesome-icon icon="undo-alt" />
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-trip" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <font-awesome-icon icon="save" />
                    Guardar
                </button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapState } from 'vuex';
import router from '../../router';
import formTrip from './form.vue'

export default {
    name: 'updateTrip',
    components: {
        formTrip
    },
    computed: {
        ...mapState('tripModule', ['trip'])
    },
    methods: {
        ...mapActions('tripModule', ['putTrip', 'getTrip']),
        cancelar() {
            router.push('/trip');
        }
    },
    mounted() {
        this.getTrip(this.$route.params.id);
    },
}
</script>