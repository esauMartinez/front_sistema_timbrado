<template>
    <div class="row">
        <div class="col-lg-12 mb-3 d-flex justify-content-end">
            <router-link class="btn btn-primary me-3" to="/crear-cliente" v-if="!hideItem">
                <!-- <font-awesome-icon icon="plus" /> -->
                Crear Cliente
            </router-link>
            <input type="text" class="form-control w-25" v-model="razon_social" @keyup="searchCliente(razon_social)" placeholder="Buscar">
        </div>
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Razon Social</th>
                        <th v-if="!hideItem">Nacionalidad</th>
                        <th>RFC</th>
                        <th v-if="!hideItem">Pais</th>
                        <th v-if="!hideItem">Estado</th>
                        <th v-if="!hideItem">Municipio</th>
                        <!-- <th v-if="!hideItem">Colonia</th> -->
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in clientes" :key="index">
                        <td>{{ item.razon_social }}</td>
                        <td v-if="!hideItem">{{ item.origen.toUpperCase() }}</td>
                        <td>{{ verifyOrigen(item) }}</td>
                        <td v-if="!hideItem">{{ item.pais }}</td>
                        <td v-if="!hideItem">{{ item.estado }}</td>
                        <td v-if="!hideItem">{{ item.municipio }}</td>
                        <!-- <td v-if="!hideItem">{{ item.colonia }}</td> -->
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteCliente(item.id)" v-if="!hideItem">
                                    <font-awesome-icon icon="trash-alt" />
                                    <!-- Eliminar -->
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-cliente/${item.id}` }" v-if="!hideItem">
                                    <font-awesome-icon icon="pencil-alt" />
                                    <!-- Modificar -->
                                </router-link>
                                <button type="button" class="btn btn-primary" @click="getCliente(item.id)" v-if="hideItem">
                                    <font-awesome-icon icon="check" />
                                    <!-- Eliminar -->
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    name: 'tableCliente',
    props: {
        hideItem: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            razon_social: ''
        }
    },
    computed: {
        ...mapState('clienteModule', ['clientes'])
    },
    methods: {
        ...mapActions('clienteModule', ['getClientes', 'deleteCliente', 'getCliente']),
        ...mapMutations('clienteModule', ['searchCliente']),
        verifyOrigen(data) {
            return (data.origen === 'nacional') ? data.rfc : data.tax_id
        }
    },
    mounted() {
        this.getClientes();
    }
}
</script>
