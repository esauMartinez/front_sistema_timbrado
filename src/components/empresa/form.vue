<template>
    <form>
        <div class="row">
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Razon social</label>
                <input type="text" class="form-control" v-model="empresa.razon_social" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">RFC</label>
                <input type="text" class="form-control" v-model="empresa.rfc" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Codigo Postal</label>
                <input type="text" class="form-control" v-model="empresa.codigo_postal" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="empresa.email" required>
            </div>
            <div class="col-lg-12 mb-3" v-if="show">
                <label for="" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="empresa.password" required>
            </div>
            <div class="col-lg-12 mb-3" v-if="show">
                <label for="" class="form-label">Confirmar Password</label>
                <input type="password" class="form-control" v-model="empresa.confirm_password" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Timbres</label>
                <input type="number" class="form-control" v-model="empresa.timbres" required>
            </div>
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Usuarios</label>
                <input type="number" class="form-control" v-model="empresa.usuarios" required>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'formEmpresa',
    props: {
        show: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapState('empresaModule', ['empresa'])
    }
}
</script>