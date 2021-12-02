<template>
    <div class="modal" id="modalMercancia" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Mercancia</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="postMercancia(mercancia)">
                        <div class="row">
                            <div class="col-lg-6 mb-3">
                                <label for="">Producto</label>
                                <input type="text" class="form-control" v-model="mercancia.producto" required>
                            </div>      
                            <div class="col-lg-6 mb-3">
                                <label for="">Unidad de Medida</label>
                                <input type="text" class="form-control" v-model="mercancia.unidadMedida" required>
                            </div>    
                            <div class="col-lg-6 mb-3">
                                <label for="">Cantidad</label>
                                <input type="text" class="form-control" v-model="mercancia.cantidad" required>
                            </div>    
                            <div class="col-lg-6 mb-3">
                                <label for="">Peso</label>
                                <input type="text" class="form-control" v-model="mercancia.peso" required>
                            </div>    
                            <div class="col-lg-6 mb-3">
                                <label for="">Fraccion Arancelaria</label>
                                <input type="text" class="form-control" v-model="mercancia.fraccionArancelaria" required>
                            </div>    
                            <div class="col-lg-6 mb-3">
                                <label for="">UUID de Comercio Exterior</label>
                                <input type="text" class="form-control" v-model="mercancia.uuidComercioExt"  required>
                            </div>
                            <div class="col-lg-12 d-flex justify-content-end">
                                <button class="btn btn-primary w-25">
                                    <font-awesome-icon icon="save" />
                                    Guardar
                                </button>    
                            </div>  
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { Modal } from 'bootstrap'
export default {
    name: 'modalMercancia',
    computed: {
        ...mapState('tripModule', ['mercancia'])
    },
    methods: {
        ...mapMutations('tripModule', ['showModal']),
        ...mapActions('tripModule', ['postMercancia'])
    },
    mounted() {
        var modalMercancia = new Modal(document.getElementById('modalMercancia'), {
            backdrop: true
        })
        modalMercancia.show();

        document.getElementById('modalMercancia').addEventListener('hidden.bs.modal', () => {
            this.showModal();
        })
    }
}
</script>