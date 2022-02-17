<template>
    <div class="container">
        <form-servicio @submit.prevent="postServicio(servicio)" id="form-servicio"></form-servicio>

         <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-servicio" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router'
import { mapActions, mapState } from 'vuex'
import formServicio from './form.vue'
export default {
    name: 'crearServicio',
    components: {
        formServicio
    },
    computed: {
        ...mapState('servicioModule', ['servicio'])
    },
    methods: {
        ...mapActions('servicioModule', ['postServicio']),
        cancelar() {
            router.push('/servicio')
        }
    },
}
</script>