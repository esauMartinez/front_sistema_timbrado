<template>
    <div class="container mt-5">
        <form-remolque @submit.prevent="putRemolque(remolque)" id="form-remolque"></form-remolque>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-remolque" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapState } from 'vuex';
import router from '../../router';
import formRemolque from './form.vue';

export default {
    name: 'updateRemolque',
    components: {
        formRemolque
    },
    computed: {
        ...mapState('remolqueModule', ['remolque'])
    },
    methods: {
        ...mapActions('remolqueModule', ['putRemolque', 'getRemolque']),
        cancelar() {
            router.push('/remolque');
        }
    },
    mounted() {
        this.getRemolque(this.$route.params.id);
    }
}
</script>