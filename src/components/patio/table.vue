<template>
    <div class="row">
        <div class="col-lg-12 mb-3 d-flex justify-content-end">
            <router-link class="btn btn-primary me-3" to="/crear-patio" v-if="!hideItem">
                <font-awesome-icon icon="plus" />
                Agregar Patio
            </router-link>
            <input type="text" class="form-control w-25" v-model="nombre" @keyup="searchPatio(nombre)" placeholder="Buscar">
        </div>

        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th v-if="!hideItem">Pais</th>
                        <th>Estado</th>
                        <th>Municipio</th>
                        <th v-if="!hideItem">Colonia</th>
                        <th v-if="!hideItem">Calle</th>
                        <th v-if="!hideItem">Numero Ext.</th>
                        <th v-if="!hideItem">Numero Int.</th>
                        <th v-if="!hideItem">Referencia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in patios" :key="index">
                        <td>{{item.nombre}}</td>
                        <td v-if="!hideItem">{{item.pais}}</td>
                        <td>{{item.estado}}</td>
                        <td>{{item.municipio}}</td>
                        <td v-if="!hideItem">{{item.colonia}}</td>
                        <td v-if="!hideItem">{{item.calle}}</td>
                        <td v-if="!hideItem">{{item.exterior}}</td>
                        <td v-if="!hideItem">{{item.interior}}</td>
                        <td v-if="!hideItem">{{item.referencia}}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger me-1" @click="deletePatio(item.id)" v-if="!hideItem">
                                    <font-awesome-icon icon="trash-alt"/>
                                    <!-- Eliminar -->
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-patio/${item.id}`}" v-if="!hideItem">
                                    <font-awesome-icon icon="pencil-alt"/>
                                    <!-- Modificar -->
                                </router-link>
                                <button type="button" class="btn btn-primary" @click="getPatioTrip({ id: item.id, tipo: tipo_patio })" v-if="hideItem">
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'tablePatio',
    props: {
        hideItem: {
            type: Boolean,
            default: false
        },
        tipo_patio: {
            type: String
        }
    },
    data() {
        return {
            nombre: ''
        }
    },
    computed: {
        ...mapState('patioModule',['patios'])
    },
    methods: {
        ...mapActions('patioModule',['getPatios','deletePatio', 'getPatio', 'getPatioTrip']),
        ...mapMutations('patioModule', ['searchPatio'])
    },
    mounted() {
        this.getPatios()
    }
}
</script>