<template>
    <div class="backgroud-login">
        <div class="card-login">
            <div>
                <h1>BIENVENIDO</h1>
            </div>
            <form @submit.prevent="auth(usuario)">
                <div class="row">
                    <div class="col-lg-12 mb-3 mt-3">                        
                        <label for="" class="text-white">{{$route.meta.hideNavba}}</label>
                        <input type="email" class="form-control" v-model="usuario.email" required>
                    </div>
                    <div class="col-lg-12 mb-3">
                        <label for="" class="text-white">Password</label>
                        <input type="password" class="form-control" v-model="usuario.password" required>
                    </div>
                    <div class="col-lg-12 d-flex justify-content-end mb-3">
                        <button type="submit" class="btn btn-primary w-100">Entrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    name: 'Login',
    computed: {
        ...mapState(
            'usuarioModule', 
            [ 'usuario' ]
        )
    },
    methods: {
        ...mapMutations(
            'usuarioModule', 
            [ 'clearSession' ]
        ),
        ...mapActions(
            'usuarioModule', 
            [ 'auth' ]
        )
    },
    mounted() {
        this.clearSession();
    },
}
</script>

<style scoped>
    .backgroud-login {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url("../assets/login.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }

    .card-login {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20%;
        height: 50%;
        background: rgba(87, 87, 87, 0.863);
        border-radius: 4px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        box-shadow: 20px -16px 0px #888888;
    }

    .card-login h1 {
        color: #fff;
    }
</style>