<template>
    <div class="container mt-5">
        <formUnidad @submit.prevent="postUnidad(unidad)" id="form-unidad"/>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-unidad" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import router from '../../router';
import formUnidad from './form.vue'
import Unidad from '../../classes/unidad';

export default {
    name: 'createUnidad',
    components: {
        formUnidad
    },
    computed: {
        ...mapState('unidadModule', ['unidad'])
    },
    methods: {
        ...mapMutations('unidadModule', ['setUnidad']),
        ...mapActions('unidadModule', ['postUnidad']),
        cancelar() {
            router.push('/unidad');
        }
    },
    mounted() {
        const unidad = new Unidad();
        this.setUnidad(unidad);
    }
}
</script>

<style>

</style>