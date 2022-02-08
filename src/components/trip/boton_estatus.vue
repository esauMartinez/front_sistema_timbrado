<template>
    <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Estatus
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" @click="updateStatus({ id: id, estatus: 'creado' })">Creado</a></li>
            <li><a class="dropdown-item" @click="updateStatus({ id: id, estatus: 'transito' })">Transito</a></li>
            <li><a class="dropdown-item" @click="updateStatus({ id: id, estatus: 'terminado' })">Terminado</a></li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'estatus',
    props: {
        id: {
            type: Number
        }
    },
    methods: {
        ...mapActions('tripModule', ['updateStatus']),
    },
}
</script>
