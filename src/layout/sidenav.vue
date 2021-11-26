<template>
    <div class="side-nav">
        <ul class="menu">
            <li class="li-menu" v-for="(item, index) in items" :key="index">
                <router-link class="link-menu" :to="item.url">{{ item.nombre }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'sidenav',
    data() {
        return {
            items: [
                { nombre: 'Cliente', url: '/cliente' },
                { nombre: 'Operador', url: '/operador' },
                { nombre: 'Remolque', url: '/remolque' },
                { nombre: 'Unidad', url: '/unidad' },
                { nombre: 'Patio', url: '/patio' },
                { nombre: 'Salir', url: '/' },
            ]
        }
    },
}
</script>

<style scoped>
    .side-nav {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 350px;
        background: rgb(87, 87, 87);
    }

    .menu {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .li-menu {
        display: flex;
    }

    .link-menu {
        padding: 8px;
        width: 100%;
        color: #ffffff;
        text-decoration: none;
        cursor: pointer;
    }

    .link-menu:hover {
        background: #ffffff;
        color: #000000;
    }
</style>
