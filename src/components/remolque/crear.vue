<template>
    <div class="container mt-5">
        <form-remolque @submit.prevent="postRemolque(remolque)" id="form-remolque"></form-remolque>

        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">                        
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-remolque" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,  mapMutations, mapState } from 'vuex';
import router from '../../router';
import formRemolque from './form.vue';
import Remolque from '../../classes/remolque';

export default {
    name: 'createRemolque',
    components: {
        formRemolque
    },
    computed: {
        ...mapState('remolqueModule',['remolque'])
    },
    methods: {
        ...mapMutations('remolqueModule',['setRemolque']),
        ...mapActions('remolqueModule',['postRemolque']),
        cancelar(){
            router.push('/remolque');
        }
    },
    mounted() {
        const remolque = new Remolque();
        this.setRemolque(remolque);
    }
}
</script>