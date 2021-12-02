<template>
    <div class="side-nav">
        <ul class="menu">
            <li class="li-menu" v-for="(item, index) in items" :key="index">
                <router-link class="link-menu" :to="item.url" v-if="user_rol === 'USER_ADMIN_SYSTEM' || user_rol === 'USER_STD_SYSTEM'">
                    <font-awesome-icon class="icon" :icon="item.icon" />
                    {{ item.nombre }}
                </router-link>
            </li>

            <li class="li-menu">
                <a class="link-menu" @click="logOut">
                    <font-awesome-icon class="icon" icon="sign-out-alt" />
                    Salir
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'sidenav',
    data() {
        return {
            items: [
                { nombre: 'Clientes', url: '/cliente', icon: 'address-card', function: '' },
                { nombre: 'Operadores', url: '/operador', icon: 'users', function: '' },
                { nombre: 'Remolques', url: '/remolque', icon: 'truck-moving', function: '' },
                { nombre: 'Unidades', url: '/unidad', icon: 'truck-loading', function: '' },
                { nombre: 'Patios', url: '/patio', icon: 'map-marker-alt', function: '' },
                { nombre: 'Trips', url: '/trip', icon: 'file-invoice', function: '' },
            ]
        }
    },
    computed: {
        ...mapState('usuarioModule', ['user_rol'])
    },
    methods: {
        ...mapMutations('usuarioModule', ['logOut'])
    }
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
        background: rgb(143, 143, 143);
        color: #000000;
    }

    .icon {
        margin-right: 10px;
    }
</style>
