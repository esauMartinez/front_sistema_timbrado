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
                        <button class="btn btn-outline-secondary" @click="setEmpresa({ empresa: item.uuid, tipo: 'timbres' })" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <font-awesome-icon icon="plus" />
                        </button>

                        <router-link class="btn btn-outline-secondary" :to="{ path: `/modificar-empresa/${item.uuid}` }">
                            <font-awesome-icon icon="pencil-alt" />
                            <!-- Modificar -->
                        </router-link>

                        <button class="btn btn-outline-secondary" @click="setEmpresa({ empresa: item.uuid, tipo: 'usuarios' })" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                    <form-usuario v-if="showFormUsuario" @submit.prevent="crearUsuarioEmpresa(usuario)" :usuario="usuario" id="form-data"></form-usuario>

                    <form-timbres v-else @submit.prevent="addTimbresEmpresa(timbres)" id="form-data"></form-timbres>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary" form="form-data">Guardar usuario</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import formUsuario from '../usuario/form.vue'
import formTimbres from '../ajustes/formularioTimbre.vue'
export default {
    name: 'tableEmpresa',
    components: {
        formUsuario,
        formTimbres
    },
    props: {
        empresas: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            showFormUsuario: false,
        }
    },
    computed: {
        ...mapState('usuarioModule', ['usuario']),
        ...mapState('empresaModule', ['timbres'])
    },
    methods: {
        ...mapActions('empresaModule', ['crearUsuarioEmpresa', 'addTimbresEmpresa']),
        setEmpresa(payload) {
            if (payload.tipo === 'usuarios') {
                this.usuario.empresa = payload.empresa;
                this.showFormUsuario = true;
            } else {
                this.showFormUsuario = false;
                this.timbres.empresa = payload.empresa;
            }
        },
    },
}
</script>
