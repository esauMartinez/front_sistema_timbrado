<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-12 mt-5 mb-5 d-flex justify-content-center">
				<h1>BIENVENIDO {{nombre}}</h1>
			</div>
			<div class="col-lg-3 mb-3" v-for="(item, index) in items" :key="index" @click="sendTo(item.url)">
				<div class="my-card">
					<div class="my-card-title">
						<h5>{{ item.title }}</h5>
						<h5 v-if="item.title === 'Cotizaciones'">{{cotizaciones.length}}</h5>
						<h5 v-if="item.title === 'Trips'">{{trips.length}}</h5>
					</div>
					<div class="my-card-body">
						<font-awesome-icon class="icon" :icon="item.icon" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import router from '../router';

export default {
	name: 'Home',
	data() {
		return {
			nombre: '',
			items: [
				{ title: 'Clientes', icon: 'address-card', url: '/cliente' },
				{ title: 'Operadores', icon: 'hard-hat', url: '/operador' },
				{ title: 'Remolques', icon: 'truck-moving', url: '/remolque' },
				{ title: 'Unidades', icon: 'truck-loading', url: '/unidad' },
				{ title: 'Patios', icon: 'map-marker-alt', url: '/patio' },
				{ title: 'Cotizaciones', icon: 'dollar-sign', url: '/cotizacion' },
				{ title: 'Trips', icon: 'file-invoice', url: '/trip' },
				{ title: 'Usuarios', icon: 'users', url: '/usuario' },
			]
		}
	},
	computed: {
		...mapState('cotizacionModule', ['cotizaciones']),
		...mapState('tripModule', ['trips'])
	},
	methods: {
		sendTo(url) {
			router.push(url);
		},
		...mapActions('cotizacionModule', ['getCotizaciones']),
		...mapActions('tripModule', ['getTrips'])
	},
	mounted() {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		this.nombre = `${usuario.nombre} ${usuario.paterno} ${usuario.materno}`;

		this.getCotizaciones('enviada');
		this.getTrips('transito');
	}
}
</script>

<style scoped>
	.my-card {
		width: 100%;
		/* border-radius: 6px; */
		border: 1px solid rgba(189, 189, 189, 0.87);
	}

	.my-card-title {
		padding: 10px 10px;
		border-bottom: 1px solid rgba(189, 189, 189, 0.87);
		display: flex;
		justify-content: space-between;
	}

	.my-card-body {
		display: flex;
		justify-content: center;
		padding: 20px;
	}

	.icon {
		font-size: 6em;
	}

	.my-card:hover {
		background-color: rgba(189, 189, 189, 0.685);
		cursor: pointer;
	}
</style>
