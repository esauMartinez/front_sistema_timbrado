<template>
    <div class="container">
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