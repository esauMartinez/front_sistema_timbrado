<template>
    <div class="row">
        <div class="col-lg-12">
            <table class="table table-bordered table-hover">
                
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="(item, index) in usuarios" 
                        :key="index"
                        :class="[{ isHide: item.user_rol === 'USER_CLIENTE_SYSTEM' && type === -1 }]">
                        <td>{{ item.nombre }} {{ item.paterno }} {{ item.materno }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.password }}</td>
                        <td>{{ tipoUsuario(item.user_rol) }}</td>
                        <td>
                            <div class="d-flex justify-content-around">
                                <button 
                                    v-if="user_rol === 'USER_ADMIN_SYSTEM'"
                                    class="btn btn-outline-danger" 
                                    @click="deleteUsuario(item)">
                                    <font-awesome-icon icon="trash-alt" />
                                    <!-- Eliminar -->
                                </button>
                                <router-link 
                                    v-if="user_rol === 'USER_ADMIN_SYSTEM'"
                                    class="btn btn-warning" 
                                    :to="{ path: `/modificar-usuario/${item.id}` }">
                                    <font-awesome-icon icon="pencil-alt" />
                                    <!-- Modificar -->
                                </router-link>

                                <button
                                    v-if="user_rol === 'USER_ROOT_SYSTEM'"
                                    class="btn btn-info"
                                    @click="getUsuario(item.id)">
                                    <font-awesome-icon icon="pencil-alt" />
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
import { mapActions, mapState } from 'vuex'
export default {
    name: 'tableUsuario',
    props: {
        empresa: {
            type: String
        },
        user_rol: {
            type: String
        }
    },
    computed: {
        ...mapState(
            'usuarioModule', 
            [ 'usuarios' ]
        )
    },
    methods: {
        ...mapActions(
            'usuarioModule', 
            [ 'getUsuarios', 'deleteUsuario', 'getUsuario' ]
        ),
        tipoUsuario(rol) {
            if (rol === 'USER_ADMIN_SYSTEM') {
                return 'Administrador';
            } else if(rol === 'USER_STD_SYSTEM') {
                return 'Usuario';
            } else if (rol === 'USER_CLIENTE_SYSTEM') {
                return 'Cliente';
            }
        }
    },
    mounted() {
        this.getUsuarios(this.empresa);
    }
}
</script>
<style scoped>
    .isHide {
        display: none;
    }
</style>
