<template>
    <div class="row">
        <div class="col-lg-12">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in usuarios" :key="index">
                        <td>{{ item.nombre }} {{ item.patern }} {{ item.materno }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.password }}</td>
                        <td>{{ item.user_rol }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-danger" @click="deleteUsuario(item.id)">
                                    <font-awesome-icon icon="trash-alt" />
                                    Eliminar
                                </button>
                                <router-link class="btn btn-warning" :to="{ path: `/modificar-usuario/${item.id}` }">
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
import { mapActions, mapState } from 'vuex'
export default {
    name: 'tableUsuario',
    computed: {
        ...mapState('usuarioModule', ['usuarios'])
    },
    methods: {
        ...mapActions('usuarioModule', ['getUsuarios', 'deleteUsuario'])
    },
    mounted() {
        this.getUsuarios();
    }
}
</script>
