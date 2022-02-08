<template>
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Concepto</th>
                <th>Clave</th>
                <th>Monto</th>
                <th>IVA</th>
                <th>Retencion</th>
                <th>Total</th>
                <th v-if="tipo === 'trip' && estatus === 'creado'"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in conceptos" :key="index">
                <td>{{item.concepto}}</td>
                <td>{{item.clave_concepto}}</td>
                <td>{{parseFloat(item.monto).toFixed(2)}}</td>
                <td>{{item.iva}}%</td>
                <td>{{item.retencion}}%</td>
                <td>{{ calcularTotal(item).toFixed(2) }}</td>
                <td v-if="tipo === 'trip' && estatus === 'creado'">
                    <div class="d-flex justify-content-around">
                        <button type="button" class="btn btn-outline-danger" @click="deleteConcepto(item.id)"  v-if="(tipo === 'trip' && estatus === 'creado')">
                            <font-awesome-icon icon="trash-alt" />
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'tableConcepto',
    props: {
        estatus: {
            type: String
        },
        tipo: {
            type: String
        }
    },
    computed: {
        ...mapState('conceptoModule', ['conceptos']),
        ...mapState('tripModule', ['trip']),
    },
    methods: {
        ...mapActions('conceptoModule', ['deleteConcepto']),
        calcularTotal(data) {
            let iva = (data.iva / 100) * data.monto;
            let retencion = (data.retencion / 100) * data.monto;
            return parseFloat(data.monto) + parseFloat(iva) - parseFloat(retencion);
        }
    },
}
</script>