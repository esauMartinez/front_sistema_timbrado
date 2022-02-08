<template>
    <div class="row">
        <div class="col-lg-12 mb-3 d-flex justify-content-end">
            <router-link class="btn btn-primary me-3" to="/crear-servicio">
                <font-awesome-icon icon="plus" />
                Crear Servicio
            </router-link>
            <input type="text" class="form-control w-25" v-model="nombre" @keyup="searchPatio(nombre)" placeholder="Buscar">            
        </div>

        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Clave</th>
                        <th>Descripcion</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in servicios" :key="index">
                        <td>{{item.clave}}</td>
                        <td>{{item.descripcion}}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger me-1" @click="deleteServicio(item.id)">
                                    <font-awesome-icon icon="trash-alt"/>
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
    name: 'tableServicio',
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
        ...mapState('servicioModule', ['servicios'])
    },
    methods: {
        ...mapActions('servicioModule', ['getServicios','deleteServicio'])
    },
    mounted() {
        this.getServicios()
    }
}
</script>