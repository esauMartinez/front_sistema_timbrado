<template>
    <div class="modal" id="modalConcepto" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Concepto</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="postConcepto(concepto)">
                        <div class="row">
                            <div class="col-lg-6 mb-3">
                                <label for="">Concepto</label>
                                <!-- <input type="text" class="form-control" v-model="concepto.concepto" required> -->
                                <select class="form-control" v-model="concepto_select" @change="setConcepto(concepto_select)">
                                    <option value=""></option>
                                    <option v-for="(item, index) in servicios" :key="index" :value="item">{{item.descripcion}}</option>
                                </select>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label for="">Monto</label>
                                <input type="text" class="form-control" v-model="concepto.monto" required>                                
                            </div>    
                            <div class="col-lg-6 mb-3">
                                <label for="">IVA</label>
                                <!-- <input type="text" class="form-control" v-model="concepto.iva" required> -->
                                <select class="form-control" v-model="concepto.iva" required>
                                    <option value="0">0%</option>
                                    <option value="12">12%</option>
                                    <option value="16">16%</option>
                                </select>
                            </div>    
                            <div class="col-lg-6 mb-3">
                                <label for="">Retencion</label>
                                <!-- <input type="text" class="form-control" v-model="concepto.retencion" required> -->
                                <select class="form-control" v-model="concepto.retencion" required>
                                    <option value="0">0%</option>
                                    <option value="4">4%</option>
                                </select>
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
    name: 'modalConcepto',
    props: {
        tipo: {
            type: String
        },
        clave: {
            type: Number
        }
    },
    data() {
        return {
            concepto_select: ''
        }
    },
    computed: {
        ...mapState('conceptoModule', ['concepto']),
        ...mapState('servicioModule', ['servicios'])
    },
    methods: {
        ...mapActions('conceptoModule', ['postConcepto']),
        ...mapActions('servicioModule', ['getServicios']),
        ...mapMutations('conceptoModule', ['setTipoConcepto', 'showModalConcepto', 'setConcepto'])
    },
    mounted() {
        var modalConcepto = new Modal(document.getElementById('modalConcepto'), {
            backdrop: true
        })
        modalConcepto.show();

        document.getElementById('modalConcepto').addEventListener('hidden.bs.modal', () => {
            this.showModalConcepto();
        })

        this.setTipoConcepto({ clave: this.clave, tipo: this.tipo });

        this.getServicios();
    },

}
</script>