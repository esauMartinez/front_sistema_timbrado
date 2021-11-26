<template>
	<sidenav v-if="user_accepted"></sidenav>

	<router-view/>
</template>

<script>
import sidenav from './layout/sidenav.vue'
import { mapState } from 'vuex'

export default {
	components: {
		sidenav
	},
	computed: {
		...mapState('usuarioModule', ['user_accepted'])
	}
}
</script>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

	html, body, * {
		font-family: 'Roboto', sans-serif !important;
	}
	
	body {
		padding: 10px 10px 10px 360px;
		/* background-color: rgb(223, 223, 223) !important; */
	}
</style>
