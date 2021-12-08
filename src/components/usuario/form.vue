<template>
    <form>
        <div class="row">
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="usuario.nombre" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Paterno</label>
                <input type="text" class="form-control" v-model="usuario.paterno" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Materno</label>
                <input type="text" class="form-control" v-model="usuario.materno" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="usuario.email" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="usuario.password" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Rol</label>
                <select class="form-control" v-model="usuario.user_rol">
                    <option value=""></option>
                    <option value="USER_ADMIN_SYSTEM">Administrado</option>
                    <option value="USER_STD_SYSTEM">Usuario</option>
                    <option value="USER_CLIENTE_SYSTEM">Cliente</option>
                </select>
            </div>
            <div class="col-lg-12 mb-3" v-if="usuario.user_rol === 'USER_CLIENTE_SYSTEM'">
                <label for="" class="form-label">Cliente</label>
                <select class="form-control" v-model="usuario.cliente">
                    <option value=""></option>
                    <option v-for="(item, index) in clientes" :key="index" :value="item.id">{{item.razon_social}}</option>
                </select>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'formUsuario',
    props: {
        usuario: {
            type: Object
        }
    },
    computed: {
        ...mapState('clienteModule', ['clientes'])
    },
    methods: {
        ...mapActions('clienteModule', ['getClientes'])
    },
    mounted() {
        this.getClientes();
    },
}
</script>