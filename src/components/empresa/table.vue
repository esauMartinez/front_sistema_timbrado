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
                        <router-link class="btn btn-warning" :to="{ path: `/modificar-empresa/${item.id}` }">
                            <font-awesome-icon icon="pencil-alt" />
                            <!-- Modificar -->
                        </router-link>

                        <button class="btn btn-primary">
                            <font-awesome-icon icon="users" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'tableEmpresa',
    props: {
        empresas: {
            type: Array,
            default: []
        }
    }
}
</script>
