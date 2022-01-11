<template>
    <div class="container mt-5">
        <table-cliente></table-cliente>
    </div>
</template>

<script>
import tableCliente from '../components/cliente/table'

export default {
    name: 'Cliente',
    components: {
        tableCliente
    }
}
</script>