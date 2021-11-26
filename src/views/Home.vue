<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-12 mt-5 d-flex justify-content-center">
				<h1>BIENVENIDO {{nombre}}</h1>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Home',
	data() {
		return {
			nombre: ''
		}
	},
	mounted() {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		this.nombre = `${usuario.nombre} ${usuario.paterno} ${usuario.materno}`;
	}
}
</script>
