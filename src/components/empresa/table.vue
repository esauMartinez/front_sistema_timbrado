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
                        <button 
                            class="btn btn-outline-secondary" 
                            @click="setEmpresa({ empresa: item.uuid, tipo: 'timbres' })" 
                            data-bs-toggle="modal" 
                            data-bs-target="#modalRoot">
                            <font-awesome-icon icon="bell" />
                        </button>


                        <router-link 
                            class="btn btn-outline-secondary" 
                            :to="{ path: `/modificar-empresa/${item.uuid}` }">
                            <font-awesome-icon icon="pencil-alt" />
                        </router-link>

                        <button 
                            class="btn btn-outline-secondary" 
                            @click="setEmpresa({ empresa: item.uuid, tipo: 'crear' })" 
                            data-bs-toggle="modal" 
                            data-bs-target="#modalRoot">
                            <font-awesome-icon icon="user-plus" />
                        </button>

                        <button 
                            class="btn btn-outline-secondary" 
                            @click="setEmpresa({ empresa: item.uuid, tipo: 'usuarios' })"
                            data-bs-toggle="modal" 
                            data-bs-target="#modalRoot">
                            <font-awesome-icon icon="users" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="modal" tabindex="-1" id="modalRoot">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 class="modal-title">Crear usuario</h5> -->
                    <button 
                        type="button" 
                        class="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <form-usuario 
                        v-if="tipo === 'usuarios' || tipo === 'crear'" 
                        @submit.prevent="tipo !== 'crear' ? putUsuarioEmpresa(usuario) : crearUsuarioEmpresa(usuario)" 
                        :usuario="usuario" 
                        id="form-data">
                    </form-usuario>

                    <form-timbres 
                        v-if="tipo === 'timbres'" 
                        @submit.prevent="addTimbresEmpresa(timbres)" 
                        id="form-data">
                    </form-timbres>
                    
                    <div class="d-flex justify-content-end mb-3">
                        <button 
                            type="button" 
                            class="btn btn-secondary me-3" 
                            data-bs-dismiss="modal">
                            Cerrar
                        </button>
                        <button 
                            type="submit" 
                            class="btn btn-primary" 
                            form="form-data">
                            Guardar usuario
                        </button>
                    </div>

                    <tableUsuarios 
                        v-if="tipo === 'usuarios'" 
                        :empresa="usuario.empresa"
                        :type="-1">
                    </tableUsuarios>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import formUsuario from '../usuario/form.vue'
import formTimbres from '../ajustes/formularioTimbre.vue'
import tableUsuarios from '../usuario/table.vue'

export default {
    name: 'tableEmpresa',
    components: {
        formUsuario,
        formTimbres,
        tableUsuarios
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
            tipo: 'crear'
        }
    },
    computed: {
        ...mapState(
            'usuarioModule', 
            [ 'usuario' ]
        ),
        ...mapState(
            'empresaModule', 
            [ 'timbres' ]
        ),
    },
    methods: {
        ...mapActions(
            'empresaModule', 
            [ 'crearUsuarioEmpresa', 'addTimbresEmpresa', 'putUsuarioEmpresa' ]
        ),
        setEmpresa({ tipo, empresa }) {
            this.tipo = tipo;
            this.usuario.empresa = empresa;
            this.timbres.empresa = empresa;
            // if (tipo === 'usuarios') {
            //     this.showFormUsuario = true;
            // } else if (tipo === 'timbre') {
            //     this.showFormUsuario = false;
            //     this.timbres.empresa = empresa;
            // } else {
            //     this.showFormUsuario = true;
            //     this.timbres.empresa = empresa;
            // }
        },
    },
    mounted() {

        const modalRoot = document.getElementById('modalRoot')

        modalRoot.addEventListener('hidden.bs.modal', () => {
            this.showFormUsuario = false;
        })
    },
}
</script>
