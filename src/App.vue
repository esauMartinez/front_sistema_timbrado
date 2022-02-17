<template>
    <!-- <navbar></navbar> -->
	<sidenav v-if="user_accepted"></sidenav>

	<router-view class="mt-5"/>
</template>

<script>
import sidenav from './layout/sidenav.vue'
import navbar from './layout/navbar.vue'
import { mapState } from 'vuex'

export default {
	components: {
		sidenav,
        navbar
	},
	computed: {
		...mapState('usuarioModule', ['user_accepted'])
	}
}
</script>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

	html, body, * {
		font-family: 'Roboto', sans-serif !important;
	}
	
	body {
		padding: 0px 0px 10px 350px;
		background-color: rgba(255, 255, 255, 0.945) !important;
	}

	.list {
        position: relative;
    }

    .list ul {
        position: absolute;
        width: 100%;
        background: rgb(87, 87, 87);
        list-style-type: none;
        padding: 0;
        margin: 0;
        z-index: 2;
    }

    .list ul li {
        display: flex;
    }

    .list ul li a {
        padding: 10px;
        cursor: pointer;
        color: #fff !important;
        width: 100%;
    }

    .list ul li a:hover {
        background: rgb(161, 161, 161);
    }
</style>
