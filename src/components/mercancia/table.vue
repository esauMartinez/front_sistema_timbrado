<template>
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Unidad de Medida</th>
                <th>Cantidad</th>
                <th>Peso</th>
                <th>Fraccion Arancelaria</th>
                <th>Pedimento</th>
                <th>Material Peligroso</th>
                <th>Embalaje</th>
                <th v-if="tipo === 'trip' && estatus === 'creado'"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in mercancias" :key="index">
                <td>{{item.producto}}</td>
                <td>{{item.unidadMedida}}</td>
                <td>{{item.cantidad}}</td>
                <td>{{item.peso}}</td>
                <td>{{item.fraccionArancelaria}}</td>
                <td>{{item.pedimento}}</td>
                <td>{{item.materialPeligroso}}</td>
                <td>{{item.embalaje}}</td>
                <td v-if="tipo === 'trip' && estatus === 'creado'">
                    <div class="d-flex justify-content-around">
                        <button type="button" class="btn btn-outline-danger" @click="deleteMercancia(item.id)" v-if="(tipo === 'trip' && estatus === 'creado')">
                            <font-awesome-icon icon="trash-alt" />
                            Eliminar
                        </button>
                        <button type="button" class="btn btn-outline-danger" @click="deleteMercanciaCotizacion(item.id)" v-if="(tipo === 'cotizacion' && estatus === 'creada')">
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
    name: 'tableMercancia',
    props: {
        estatus: {
            type: String
        },
        tipo: {
            type: String
        }
    },
    computed: {
        ...mapState('tripModule', ['mercancias'])
    },
    methods: {
        ...mapActions('tripModule', ['deleteMercancia']),
        ...mapActions('cotizacionModule', ['deleteMercanciaCotizacion']),
    }
}
</script>