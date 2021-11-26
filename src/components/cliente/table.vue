<template>
    <div class="row">
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Razon Social</th>
                        <th>Nacionalidad</th>
                        <th>RFC</th>
                        <th>Pais</th>
                        <th>Estado</th>
                        <th>Municipio</th>
                        <th>Colonia</th>
                        <td>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in clientes" :key="index">
                        <td>{{ item.razon_social }}</td>
                        <td>{{ item.origen }}</td>
                        <td>{{ item.rfc }}</td>
                        <td>{{ item.pais }}</td>
                        <td>{{ item.estado }}</td>
                        <td>{{ item.municipio }}</td>
                        <td>{{ item.colonia }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteCliente(item.id)">Eliminar</button>
                                <button class="btn btn-warning" @click="getCliente(item.id)">Modificar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'tableCliente',
    computed: {
        ...mapState('clienteModule', ['clientes'])
    },
    methods: {
        ...mapActions('clienteModule', ['getClientes', 'deleteCliente', 'getCliente'])
    },
    mounted() {
        this.getClientes();
    }
}
</script>
