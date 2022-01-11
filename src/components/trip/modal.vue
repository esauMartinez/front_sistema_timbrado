<template>
    <div class="modal" id="modalDatos" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{tableName}}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <table-cliente :hideItem="true" v-if="tableName === 'clientes'"></table-cliente>
                    <table-operador :hideItem="true" v-if="tableName === 'operadores'"></table-operador>
                    <table-remolque :hideItem="true" v-if="tableName === 'remolques'"></table-remolque>
                    <table-unidad :hideItem="true" v-if="tableName === 'unidades'"></table-unidad>
                    <table-patio :hideItem="true" v-if="tableName === 'origen'" :tipo_patio="'origen'"></table-patio>
                    <table-patio :hideItem="true" v-if="tableName === 'destino'" :tipo_patio="'destino'"></table-patio>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tableCliente from '../cliente/table.vue'
import tableOperador from '../operador/table.vue'
import tableRemolque from '../remolque/table.vue'
import tableUnidad from '../unidad/table.vue'
import tablePatio from '../patio/table.vue'
import { Modal } from 'bootstrap'
import { mapMutations } from 'vuex'

export default {
    name: 'modal',
    props: {
        tableName: {
            type: String
        }
    },
    components: {
        tableCliente,
        tableOperador,
        tableRemolque,
        tableUnidad,
        tablePatio
    },
    methods: {
        ...mapMutations('tripModule', ['showModalTable'])
    },
    mounted() {
        var modalDatos = new Modal(document.getElementById('modalDatos'), {
            backdrop: true
        })

        modalDatos.show();

        document.getElementById('modalDatos').addEventListener('hidden.bs.modal', () => {
            this.showModalTable();
        })
    }
}
</script>

<style scoped>

</style>
