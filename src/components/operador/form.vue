<template>
    <form>
        <div class="row">
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="operador.nombre" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Paterno</label>
                <input type="text" class="form-control" v-model="operador.paterno" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Materno</label>
                <input type="text" class="form-control" v-model="operador.materno" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Fecha de Nacimiento</label>
                <input type="date" class="form-control" v-model="operador.fecha_nacimiento" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Fecha de Ingreso</label>
                <input type="date" class="form-control" v-model="operador.fecha_ingreso" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">CURP</label>
                <input type="text" class="form-control" v-model="operador.curp" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">RFC</label>
                <input type="text" class="form-control" v-model="operador.rfc" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Codigo Postal</label>
                <input type="text" class="form-control" v-model="operador.codigo_postal" @keyup="searchCp(operador.codigo_postal)" required>
                <div class="list">
                    <ul>
                        <li v-for="(item, index) in codigos" :key="index">
                            <a @click="setCodigoPostal(item)">{{ item.d_asenta }}</a>
                        </li> 
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Colonia</label>
                <input type="text" class="form-control" v-model="operador.colonia" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Municipio</label>
                <input type="text" class="form-control" v-model="operador.municipio" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Estado</label>
                <input type="text" class="form-control" v-model="operador.estado" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Pais</label>
                <input type="text" class="form-control" v-model="operador.pais" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Calle</label>
                <input type="text" class="form-control" v-model="operador.calle" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Exterior</label>
                <input type="text" class="form-control" v-model="operador.exterior" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Interior</label>
                <input type="text" class="form-control" v-model="operador.interior">
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Licencia</label>
                <input type="text" class="form-control" v-model="operador.licencia" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Vencimiento Licencia</label>
                <input type="date" class="form-control" v-model="operador.vencimiento_licencia" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Estatus</label>
                <input type="text" class="form-control" v-model="operador.estatus" required>
            </div>

        </div>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    name: 'formOperador',
    computed: {
        ...mapState('operadorModule', ['operador']),
        ...mapState('postalModule', ['codigos'])
    },
    methods: {
        ...mapMutations('operadorModule', ['setCodigoPostal']),
        ...mapActions('postalModule', ['searchCp'])
    }
}
</script>
