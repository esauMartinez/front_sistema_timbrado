<template>
    <div class="container mt-5">
        <form-patio @submit.prevent="postPatio(patio)" id="form-patio"></form-patio>
        
        <div class="row">
            <div class="col-lg-2 offset-lg-8 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger w-100" @click="cancelar">
                    <!-- <font-awesome-icon icon="undo-alt" /> -->
                    Cancelar
                </button>
            </div>
            <div class="col-lg-2 d-flex justify-content-end">
                <button type="submit" form="form-patio" :class="{'btn': true, 'btn-primary': true, 'w-100': true}">
                    <!-- <font-awesome-icon icon="save" /> -->
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import router from '../../router'
import formPatio from './form.vue'
import Patio from '../../classes/patio'

export default {
    name: 'createPatio',
    components: {
        formPatio
    },
    computed: {
        ...mapState('patioModule',['patio'])
    },
    methods: {
        ...mapMutations('patioModule',['setPatio']),
        ...mapActions('patioModule',['postPatio']),
        cancelar() {
            router.push('/patio')
        }
    },
    mounted() {
        const patio = new Patio()
        this.setPatio(patio);
    }
}
</script>