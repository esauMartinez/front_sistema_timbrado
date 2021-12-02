<template>
     <div class="row">
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RFC</th>
                        <th>Codigo Postal</th>
                        <th>Licencia</th>
                        <th>Vencimiento Licencia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in operadores" :key="index">
                        <td>{{ item.nombre }} {{ item.paterno }} {{ item.materno }}</td>
                        <td>{{ item.rfc }}</td>
                        <td>{{ item.codigo_postal }}</td>
                        <td>{{ item.licencia }}</td>
                        <td>{{ item.vencimiento_licencia }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteOperador(item.id)">
                                    <font-awesome-icon icon="trash-alt" />
                                    Eliminar
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-operador/${item.id}` }">
                                    <font-awesome-icon icon="pencil-alt" />
                                    Modificar
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'tableCliente',
    computed: {
        ...mapState('operadorModule', ['operadores'])
    },
    methods: {
        ...mapActions('operadorModule', ['getOperadores', 'deleteOperador'])
    },
    mounted() {
        this.getOperadores();
    }
}
</script>
