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
        </div>
    </form>
</template>

<script>
export default {
    name: 'formUsuario',
    props: {
        usuario: {
            type: Object
        }
    }
}
</script>