<template>
    <div class="container">
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