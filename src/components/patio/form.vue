<template>
    <form>
        <div class="row">
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="patio.nombre" required>
            </div>
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Codigo Postal</label>
                <input type="text" class="form-control" v-model="patio.codigo_postal" @keyup="searchCp(patio.codigo_postal)" required>
                <div class="list">
                    <ul>
                        <li v-for="(item, index) in codigos" :key="index">
                            <a @click="setCodigoPostal(item)">{{ item.d_asenta }}</a>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Localidad</label>
                <input type="text" class="form-control" v-model="patio.localidad" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Colonia</label>
                <input type="text" class="form-control" v-model="patio.colonia" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Municipio</label>
                <input type="text" class="form-control" v-model="patio.municipio" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Estado</label>
                <input type="text" class="form-control" v-model="patio.estado" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Pais</label>
                <input type="text" class="form-control" v-model="patio.pais" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Calle</label>
                <input type="text" class="form-control" v-model="patio.calle" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Exterior</label>
                <input type="text" class="form-control" v-model="patio.exterior" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Interior</label>
                <input type="text" class="form-control" v-model="patio.interior">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Referencia</label>
                <textarea type="text" class="form-control" v-model="patio.referencia"></textarea>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    name: 'formPatio',
    computed: {
        ...mapState('patioModule', ['patio']),
        ...mapState('postalModule', ['codigos'])
    },
    methods: {
        ...mapMutations('patioModule', ['setCodigoPostal']),
        ...mapActions('postalModule', ['searchCp'])
    }
}
</script>

<style>

</style>