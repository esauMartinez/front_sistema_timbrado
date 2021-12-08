<template>
    <div class="row">
        <div class="col-lg-12 ">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Numero economico</th>
                        <th>Matricula</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Clase</th>
                        <th>Numero serie</th>
                        <th>Numero poliza</th>
                        <th>Vencimiento poliza</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in unidades" :key="index">
                        <td>{{ item.numero_economico }}</td>
                        <td>{{ item.matricula }}</td>
                        <td>{{ item.marca }}</td>
                        <td>{{ item.modelo }}</td>
                        <td>{{ item.clase }}</td>
                        <td>{{ item.numero_serie }}</td>
                        <td>{{ item.numero_poliza }}</td>
                        <td>{{ item.vencimiento_poliza }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteUnidad(item.id)">
                                    <font-awesome-icon icon="trash-alt" />
                                    Eliminar
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-unidad/${item.id}` }">
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
    name: 'tableUnidad',
    computed: {
        ...mapState('unidadModule', ['unidades'])
    },
    methods: {
        ...mapActions('unidadModule', ['getUnidades','deleteUnidad'])
    },
    mounted() {
        this.getUnidades();
    }
}
</script>

<style>

</style>