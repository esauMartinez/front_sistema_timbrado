<template>
    <form>
        <div class="row">
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Razon social</label>
                <input type="text" class="form-control" v-model="cliente.razon_social" required>
            </div>
            <div class="col-lg-6 mb-3">
                <label for="" class="form-label">Origen</label>
                <select class="form-control" v-model="cliente.origen" required>
                    <option value="nacional">Nacional</option>
                    <option value="extranjero">Extranjero</option>
                </select>
            </div>
            <div class="col-lg-3 mb-3" v-if="cliente.origen === 'nacional'">
                <label for="" class="form-label">RFC</label>
                <input type="text" class="form-control" v-model="cliente.rfc" required>
            </div>
            <div class="col-lg-3 mb-3" v-if="cliente.origen === 'extranjero'">
                <label for="" class="form-label">TAX ID</label>
                <input type="text" class="form-control" v-model="cliente.tax_id" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Uso de CFDI</label>
                <!-- <input type="text" class="form-control" v-model="cliente.uso_CFDI" required> -->
                <select class="form-control" v-model="cliente.uso_CFDI" required>
                    <option v-for="(item, index) in uso_cfdi" :key="index" :value="item.clave">{{item.clave}}-{{ item.descripcion }}</option>
                </select>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Metodo de Pago</label>
                <!-- <input type="text" class="form-control" v-model="cliente.metodo_pago" required> -->
                <select class="form-control" v-model="cliente.metodo_pago" required>
                    <option v-for="(item, index) in metodo_pago" :key="index" :value="item.clave">{{item.clave}}-{{ item.descripcion }}</option>
                </select>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Forma de Pago</label>
                <!-- <input type="text" class="form-control" v-model="cliente.forma_pago" required> -->
                <select class="form-control" v-model="cliente.forma_pago" required>
                    <option v-for="(item, index) in forma_pago" :key="index" :value="item.clave">{{item.clave}}-{{ item.descripcion }}</option>
                </select>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Codigo Postal</label>
                <input type="text" class="form-control" v-model="cliente.codigo_postal" @keyup="searchCp(cliente.codigo_postal)" required>
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
                <input type="text" class="form-control" v-model="cliente.colonia" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Municipio</label>
                <input type="text" class="form-control" v-model="cliente.municipio" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Estado</label>
                <input type="text" class="form-control" v-model="cliente.estado" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Pais</label>
                <input type="text" class="form-control" v-model="cliente.pais" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Calle</label>
                <input type="text" class="form-control" v-model="cliente.calle" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Exterior</label>
                <input type="text" class="form-control" v-model="cliente.exterior" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Interior</label>
                <input type="text" class="form-control" v-model="cliente.interior">
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="cliente.email" required>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'formCliente',
    computed: {
        ...mapState('clienteModule', ['cliente', 'metodo_pago', 'uso_cfdi', 'forma_pago']),
        ...mapState('postalModule', ['codigos'])
    },
    methods: {
        ...mapMutations('clienteModule', ['setCodigoPostal']),
        ...mapActions('postalModule', ['searchCp'])
    }
}
</script>
