<template>
    <div class="container">
        <formUnidad @submit.prevent="putUnidad(unidad)" id="form-unidad"/>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-unidad" :class="{'btn': true, 'btn-warning': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../../router'
import formUnidad from './form.vue'

export default {
    name: 'updateUnidad',
    components: {
        formUnidad
    },
    computed: {
        ...mapState('unidadModule',['unidad'])
    },
    methods: {
        ...mapActions('unidadModule',['putUnidad','getUnidad']),
        cancelar() {
            router.push('/unidad')
        }
    },
    mounted() {
        this.getUnidad(this.$route.params.id)
        console.log(this.unidad);
    }
}
</script>