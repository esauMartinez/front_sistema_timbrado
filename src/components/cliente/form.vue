<template>
    <div class="container mt-5">
        <form @submit.prevent="(method === 'post') ? postCliente(cliente) : putCliente(cliente)" id="form-cliente">
            <div class="row">
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Razon social</label>
                    <input type="text" class="form-control" v-model="cliente.razon_social" required>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">Origen</label>
                    <input type="text" class="form-control" v-model="cliente.origen" required>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">RFC</label>
                    <input type="text" class="form-control" v-model="cliente.rfc" required>
                </div>
                <div class="col-lg-6 mb-3">
                    <label for="" class="form-label">TAX ID</label>
                    <input type="text" class="form-control" v-model="cliente.tax_id" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Codigo Postal</label>
                    <input type="text" class="form-control" v-model="cliente.codigo_postal" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Colonia</label>
                    <input type="text" class="form-control" v-model="cliente.colonia" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Municipio</label>
                    <input type="text" class="form-control" v-model="cliente.municipio" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Estado</label>
                    <input type="text" class="form-control" v-model="cliente.estado" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Pais</label>
                    <input type="text" class="form-control" v-model="cliente.pais" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Calle</label>
                    <input type="text" class="form-control" v-model="cliente.calle" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Exterior</label>
                    <input type="text" class="form-control" v-model="cliente.exterior" required>
                </div>
                <div class="col-lg-3 mb-3">
                    <label for="" class="form-label">Interior</label>
                    <input type="text" class="form-control" v-model="cliente.interior" required>
                </div>
                <div class="col-lg-3 offset-lg-6 d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">Cancelar</button>
                </div>
                <div class="col-lg-3 d-flex justify-content-end">
                    <button type="submit" :class="{'btn': true, 'btn-primary':method === 'post', 'btn-warning': method === 'put', 'w-100': true}">Guardar</button>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Cliente from '../../classes/cliente'

import router from '../../router'
export default {
    name: 'formCliente',
    computed: {
        ...mapState('clienteModule', ['cliente', 'method'])
    },
    methods: {
        ...mapMutations('clienteModule', ['setCliente']),
        ...mapActions('clienteModule', ['postCliente', 'putCliente']),
        cancelar() {
            const cliente = new Cliente();
            
            this.setCliente({ cliente, method: 'post' });

            router.push('/cliente');
        }
    }
}
</script>
