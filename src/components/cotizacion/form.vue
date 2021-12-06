<template>
    <div class="row">
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">{{title}}</label>
            <input type="text" class="form-control" v-model="patio.nombre" required :disabled="ver">
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Codigo Postal</label>
            <input type="text" class="form-control" v-model="patio.codigo_postal" 
                    @keyup="(title === 'Origen') ? searchCpOrigen(patio.codigo_postal) : searchCpDestino(patio.codigo_postal)" required :disabled="ver">
            <div class="list">
                <ul>
                    <li v-for="(item, index) in codigos" :key="index">
                        <a @click="(title === 'Origen') ? setCodigoPostalOrigen(item) : setCodigoPostalDestino(item)">{{ item.d_asenta }}</a>
                    </li> 
                </ul>
            </div>
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Colonia</label>
            <input type="text" class="form-control" v-model="patio.colonia" required disabled>
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Municipio</label>
            <input type="text" class="form-control" v-model="patio.municipio" required disabled>
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Estado</label>
            <input type="text" class="form-control" v-model="patio.estado" required disabled>
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Pais</label>
            <input type="text" class="form-control" v-model="patio.pais" required disabled>
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Calle</label>
            <input type="text" class="form-control" v-model="patio.calle" required :disabled="ver">
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Numero Exterior</label>
            <input type="text" class="form-control" v-model="patio.exterior" required :disabled="ver">
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Numero Interior</label>
            <input type="text" class="form-control" v-model="patio.interior" :disabled="ver">
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'formCotizacion',
    props: {
        title: {
            type: String
        },
        patio: {
            type: Object
        },
        codigos: {
            type: Array
        },
        ver: {
            type: Boolean
        }
    },
    methods: {
        ...mapMutations('cotizacionModule', ['setCodigoPostalOrigen', 'setCodigoPostalDestino']),
        ...mapActions('cotizacionModule', ['searchCpOrigen', 'searchCpDestino']),
    },
}
</script>