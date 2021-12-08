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
                <label for="" class="form-label">Usuarios</label>
                <input type="text" class="form-control" v-model="empresa.usuarios" required>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'formEmpresa',
    computed: {
        ...mapState('empresaModule', ['empresa'])
    }
}
</script>