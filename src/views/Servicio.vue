<template>
    <div class="container mt-5">
        <table-servicio></table-servicio>
    </div>
</template>

<script>
import tableServicio from '../components/servicio/table.vue'
export default {
    name: 'servicio',
    components: {
        tableServicio
    }
}
</script>