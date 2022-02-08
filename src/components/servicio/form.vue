<template>
     <form>
        <div class="row">
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Clave</label>
                <input type="text" class="form-control" v-model="servicio.clave" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Descripcion</label>
                <input type="text" class="form-control" v-model="servicio.descripcion" required>
            </div>
        </div>
    </form>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: 'crearServicio',
    computed: {
        ...mapState('servicioModule', ['servicio'])
    }
}
</script>
