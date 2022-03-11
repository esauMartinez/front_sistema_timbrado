<template>
    <div class="side-nav">
        <div class="logo">
            <div 
                class="image" 
                v-if="empresa !== null">
                <img 
                    :src="`${url}/uploads/${empresa}/${logo()}`" 
                    width="100%">
            </div>
            <div 
                class="image" 
                v-else>
                <img 
                    :src="`${url}/uploads/logo-user.png`" 
                    width="100%">
            </div>
            <div class="name mt-3">
                <p>{{ nombre }}</p>
            </div>
        </div>
        <ul class="menu mt-3">
            <li 
                class="li-menu" 
                v-for="(item, index) in items" 
                :key="index">
                <router-link 
                    class="link-menu" 
                    :to="item.url" 
                    v-for="(permiso, i) in item.permisos" 
                    :key="i" 
                    :class="{ hideItem: permiso !== user_rol }">
                    <font-awesome-icon 
                        class="icon" 
                        :icon="item.icon" />
                    {{ item.nombre }}
                </router-link>
            </li>

            <li class="li-menu">
                <a 
                    class="link-menu" 
                    @click="logOut">
                    <font-awesome-icon 
                        class="icon" 
                        icon="sign-out-alt" />
                    Salir
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { items_sidenav } from '../services/datos'
import { url } from '../services/url'
export default {
    name: 'sidenav',
    data() {
        return {
            items: items_sidenav,
            url
        }
    },
    computed: {
        ...mapState(
            'usuarioModule', 
            [ 'user_rol', 'nombre', 'empresa' ]
        )
    },
    methods: {
        ...mapMutations(
            'usuarioModule', 
            [ 'logOut' ]
        ),
        ...mapGetters(
            'usuarioModule', 
            [ 'logo' ]
        )
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
        text-align: center;
    }

    .side-nav {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 300px;
        background: #47809E;
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
        background: #565c61;
        /* color: #000000; */
    }

    .icon {
        margin-right: 10px;
    }

    .hideItem { 
        display: none;
    }
</style>
