<template>
    <!-- <navbar></navbar> -->
	<sidenav 
        v-if="user_accepted">
    </sidenav>

	<router-view 
        :class="{ 'mt-5': user_accepted }"/>
        
    <button
        v-if="user_accepted && (user_rol === 'USER_ADMIN_SYSTEM' || user_rol === 'USER_STD_SYSTEM')"
        class="button-right-dashboard"
        @click="showDashBoard">
        <font-awesome-icon
                class="icon" 
                :icon=" mountDashboard ? 'caret-right' : 'caret-left'" />
    </button>

    <Transition 
        v-if="user_accepted" 
        name="slide-fade">
        <dashboard v-if="mountDashboard"></dashboard>
    </Transition>
</template>

<script>
import sidenav from './layout/sidenav.vue'
import navbar from './layout/navbar.vue'
import { mapState } from 'vuex'
import dashboard from './components/home/dashboard.vue'

export default {
	components: {
		sidenav,
        navbar,
        dashboard
	},
    data() {
        return {
            mountDashboard: false,
        }
    },
	computed: {
		...mapState(
            'usuarioModule', 
            [ 'user_accepted', 'user_rol' ]
        )
	},
    methods: {        
        showDashBoard() {
			this.mountDashboard = !this.mountDashboard;
		}
    },    
}
</script>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400&display=swap');

	html, body, * {
		font-family: 'Fredoka', sans-serif;
	}
	
	body {
		padding: 0px 15px 10px 320px;
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

    .button-menu {
        border-radius: 0 !important;
        padding: 20px !important;
        width: 200px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        background-color: #47809E !important;
        border-color: #47809E !important;
    }

    .button-right-dashboard {
		position: fixed;
		top: 50%;
		bottom: 50%;
		right: 0;
		padding: 50px 10px;
		width: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0;
		background-color: #47809E;
		z-index: 1001;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        transition: ease-in-out 2s;
	}

    .button-right-dashboard:hover, .button-menu:hover {
        background: #565c61 !important;
    }

    .button-right-dashboard:hover {
        width: 50px;
        transition: ease-in-out .5s;
    }

	.button-right-dashboard .icon {
		font-size: 2em;
        color: #ffffff;
	}

    /*
    Enter and leave animations can use different
    durations and timing functions.
    */
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

    .accordion-button {
        background-color: #47809E !important;
        color: #ffffff !important;
    }
</style>
