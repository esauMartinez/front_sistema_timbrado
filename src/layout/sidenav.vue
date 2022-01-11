<template>
    <div class="side-nav">
        <div class="logo">
            <div class="image">
                <img src="../assets/logo-user.png" >
            </div>
            <div class="name mt-3">
                <p>{{nombre}}</p>
            </div>
        </div>
        <ul class="menu mt-3">
            <li class="li-menu" v-for="(item, index) in items" :key="index">
                <router-link class="link-menu" :to="item.url" v-for="(permiso, i) in item.permisos" :key="i" :class="{ hideItem: permiso !== user_rol }">
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
                { nombre: 'Ajustes', url: '/ajustes', icon: 'cog', permisos: [ 'USER_ADMIN_SYSTEM' ] },
                { nombre: 'Inicio', url: '/home', icon: 'home', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Clientes', url: '/cliente', icon: 'address-card', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Operadores', url: '/operador', icon: 'hard-hat', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Remolques', url: '/remolque', icon: 'truck-loading', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Unidades', url: '/unidad', icon: 'truck-moving', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Patios', url: '/patio', icon: 'map-marker-alt', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Cotizaciones', url: '/cotizacion', icon: 'dollar-sign', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Trips', url: '/trip', icon: 'file-invoice', permisos: [ 'USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM' ] },
                { nombre: 'Usuarios', url: '/usuario', icon: 'users', permisos: [ 'USER_ADMIN_SYSTEM' ] },
                { nombre: 'Mis cotizaciones', url: '/cotizacion', icon: 'file-invoice', permisos: [ 'USER_CLIENTE_SYSTEM' ] },
            ]
        }
    },
    computed: {
        ...mapState('usuarioModule', ['user_rol', 'nombre', 'empresa'])
    },
    methods: {
        ...mapMutations('usuarioModule', ['logOut'])
    }
}
</script>

<style scoped>
    .logo {
        display: flex;
        justify-content: space-around;
        height: 150px;
        align-items: center;
        flex-direction: column;
        margin-top: 2em;
    }

    .logo img {
        width: 100px;
        height: 100px;
        z-index: 1;
    }

    .name p {
        color: #fff;
    }

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

    .hideItem { 
        display: none;
    }
</style>
