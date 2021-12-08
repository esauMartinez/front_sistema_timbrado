<template>
    <form>
        <div class="row">
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Numero economico</label>
                <input type="text" class="form-control" v-model="unidad.numero_economico" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Matricula</label>
                <input type="text" class="form-control" v-model="unidad.matricula" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Marca</label>
                <input type="text" class="form-control" v-model="unidad.marca" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Modelo</label>
                <input type="text" class="form-control" v-model="unidad.modelo" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Clase</label>
                <input type="text" class="form-control" v-model="unidad.clase" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Numero serie</label>
                <input type="text" class="form-control" v-model="unidad.numero_serie" required>
            </div>
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Numero poliza</label>
                <input type="text" class="form-control" v-model="unidad.numero_poliza" required>
            </div>
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Vencimiento poliza</label>
                <input type="date" class="form-control" v-model="unidad.vencimiento_poliza" required>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'formUnidad',
    computed: {
        ...mapState('unidadModule', ['unidad'])
    }
}
</script>