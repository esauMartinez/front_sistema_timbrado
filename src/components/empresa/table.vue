<template>
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Razon Social</th>
                <th>RFC</th>
                <th>Usuarios</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in empresas" :key="index">
                <td>{{ item.razon_social }}</td>
                <td>{{ item.rfc }}</td>
                <td>{{ item.usuarios }}</td>
                <td>
                    <div class="d-flex justify-content-around">
                        <!-- <button class="btn btn-outline-danger" @click="deleteCliente(item.id)">
                            <font-awesome-icon icon="trash-alt" />
                            Eliminar
                        </button> -->
                        <router-link class="btn btn-warning" :to="{ path: `/modificar-empresa/${item.uuid}` }">
                            <font-awesome-icon icon="pencil-alt" />
                            <!-- Modificar -->
                        </router-link>

                        <button class="btn btn-primary" @click="setEmpresa(item.uuid)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <font-awesome-icon icon="users" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="modal" tabindex="-1" id="exampleModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crear usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form-usuario @submit.prevent="crearUsuarioEmpresa(usuario)" :usuario="usuario" id="form-usuario"></form-usuario>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" form="form-usuario">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import formUsuario from '../usuario/form.vue'
export default {
    name: 'tableEmpresa',
    components: {
        formUsuario
    },
    props: {
        empresas: {
            type: Array,
            default: []
        }
    },
    computed: {
        ...mapState('usuarioModule', ['usuario']),
    },
    methods: {
        ...mapActions('empresaModule', ['crearUsuarioEmpresa']),
        setEmpresa(empresa) {
            this.usuario.empresa = empresa;
        }
    },
}
</script>
