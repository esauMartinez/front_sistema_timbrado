<template>
    <div class="row">
        <div class="col-lg-12">
            <table class="table table-striped table-border table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Pais</th>
                        <th>Estado</th>
                        <th>Municipio</th>
                        <th>Colonia</th>
                        <th>Calle</th>
                        <th>Numero Ext.</th>
                        <th>Numero Int.</th>
                        <th>Referencia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in patios" :key="index">
                        <td>{{item.nombre}}</td>
                        <td>{{item.pais}}</td>
                        <td>{{item.estado}}</td>
                        <td>{{item.municipio}}</td>
                        <td>{{item.colonia}}</td>
                        <td>{{item.calle}}</td>
                        <td>{{item.exterior}}</td>
                        <td>{{item.interior}}</td>
                        <td>{{item.referencia}}</td>
                        <td>
                            <div class="d-felx justify-content-around">
                                <button class="btn btn-outline-danger" @click="deletePatio(item.id)">
                                    <font-awesome-icon icon="trash-alt"/>
                                    Eliminar
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-patio/${item.id}`}">
                                    <font-awesome-icon icon="pencil-alt"/>
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
    name: 'tablePatio',
    computed: {
        ...mapState('patioModule',['patios'])
    },
    methods: {
        ...mapActions('patioModule',['getPatios','deletePatio']),
    },
    mounted() {
        this.getPatios()
    }
}
</script>