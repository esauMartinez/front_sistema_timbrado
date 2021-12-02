<template>
    <div class="container mt-5">
        <form @submit.prevent="(method === 'post') ? postOperador(operador) : putOperador(operador)" id="form-operador">
            <div class="row">
                <div class="col-lg-4 mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" class="form-control" v-model="operador.nombre" required>   
                </div>
                <div class="col-lg-4 mb-3">
                    <label class="form-label">Apellido paterno</label>
                    <input type="text" class="form-control" v-model="operador.paterno" required>   
                </div>
                <div class="col-lg-4 mb-3">
                    <label class="form-label">Apellido materno</label>
                    <input type="text" class="form-control" v-model="operador.nombre" required>   
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 mb-3">
                    <label class="form-label">Fecha nacimiento</label>
                    <input type="date" class="form-control" v-model="operador.fecha_nacimiento" required>
                </div>
            </div>
        </form>
        
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Operador from '../../classes/operador'
import router from '../../router'

export default {
    name: 'formOperador',
    computed: {
        ...mapState('operadorModule',['operador', 'method'])
    },
    methods: {
        ...mapMutations('operadorModule',['setOperador']),
        ...mapActions('operaodrModule',['postOperador','putOperador']),
        cancelar() {
            const operador = new Operador();
            this.setOperador({operador, method: 'post'});
            router.push('/operador');
        }
    }
}
</script>

<style>

</style>
