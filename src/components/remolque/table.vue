<template>
    <div class="row">
        <div class="col-lg-12 mb-3 d-flex justify-content-end">
            <router-link class="btn btn-primary me-3" to="/crear-remolque" v-if="!hideItem">
                <font-awesome-icon icon="plus" />
                Agregar remolque
            </router-link>
            <input type="text" class="form-control w-25" v-model="numero_economico" @keyup="searchRemolque(numero_economico)" placeholder="Buscar">
        </div>
        <div class="col-lg-12 ">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Numero economico</th>
                        <th>Placa</th>
                        <th v-if="!hideItem">Marca</th>
                        <th v-if="!hideItem">Modelo</th>
                        <th>Clase</th>
                        <th v-if="!hideItem">Numero serie</th>
                        <th v-if="!hideItem">Numero poliza</th>
                        <th v-if="!hideItem">Vencimiento poliza</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in remolques" :key="index">
                        <td>{{ item.numero_economico }}</td>
                        <td>{{ item.placa }}</td>
                        <td v-if="!hideItem">{{ item.marca }}</td>
                        <td v-if="!hideItem">{{ item.modelo }}</td>
                        <td>{{ item.clase }}</td>
                        <td v-if="!hideItem">{{ item.numero_serie }}</td>
                        <td v-if="!hideItem">{{ item.numero_poliza }}</td>
                        <td v-if="!hideItem">{{ item.vencimiento_poliza }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteRemolque(item.id)" v-if="!hideItem">
                                    <font-awesome-icon icon="trash-alt" />
                                    <!-- Eliminar -->
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-remolque/${item.id}` }" v-if="!hideItem">
                                    <font-awesome-icon icon="pencil-alt" />
                                    <!-- Modificar -->
                                </router-link>
                                <button type="button" class="btn btn-primary" @click="getRemolque(item.id)" v-if="hideItem">
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
    name: 'tableRemolque',
    props: {
        hideItem: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            numero_economico: ''
        }
    },
    computed: {
        ...mapState('remolqueModule', ['remolques'])
    },
    methods: {
        ...mapActions('remolqueModule', ['getRemolques','deleteRemolque', 'getRemolque']),
        ...mapMutations('remolqueModule',['searchRemolque'])
    },
    mounted() {
        this.getRemolques();
    }
}
</script>