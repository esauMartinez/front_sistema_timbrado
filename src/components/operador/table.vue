<template>
    <div class="row">
        <div class="col-lg-12 mb-3 d-flex justify-content-end">
            <router-link class="btn btn-primary me-3" to="/crear-operador" v-if="!hideItem">
                <!-- <font-awesome-icon icon="plus" /> -->
                Crear Operador
            </router-link>
            <input type="text" class="form-control w-25" v-model="nombre" @keyup="searchOperador(nombre)" placeholder="Buscar">
        </div>
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RFC</th>
                        <th v-if="!hideItem">Codigo Postal</th>
                        <th v-if="!hideItem">Licencia</th>
                        <th v-if="!hideItem">Vencimiento Licencia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in operadores" :key="index">
                        <td>{{ item.nombre }} {{ item.paterno }} {{ item.materno }}</td>
                        <td>{{ item.rfc }}</td>
                        <td v-if="!hideItem">{{ item.codigo_postal }}</td>
                        <td v-if="!hideItem">{{ item.licencia }}</td>
                        <td v-if="!hideItem">{{ item.vencimiento_licencia }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteOperador(item.id)" v-if="!hideItem">
                                    <font-awesome-icon icon="trash-alt" />
                                    <!-- Eliminar -->
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-operador/${item.id}` }" v-if="!hideItem">
                                    <font-awesome-icon icon="pencil-alt" />
                                    <!-- Modificar -->
                                </router-link>
                                <button type="button" class="btn btn-primary" @click="getOperador(item.id)" v-if="hideItem">
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
    name: 'tableCliente',
    props: {
        hideItem: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            nombre: ''
        }
    },
    computed: {
        ...mapState('operadorModule', ['operadores'])
    },
    methods: {
        ...mapActions('operadorModule', ['getOperadores', 'deleteOperador', 'getOperador']),
        ...mapMutations('operadorModule', ['searchOperador'])
    },
    mounted() {
        this.getOperadores();
    }
}
</script>
