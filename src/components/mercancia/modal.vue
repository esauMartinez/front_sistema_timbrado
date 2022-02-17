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
                    <div class="accordion" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingUnaMercancia">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseUnaMercancia" aria-expanded="true" aria-controls="panelsStayOpen-collapseUnaMercancia">
                                    Subir Mercancia
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseUnaMercancia" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingUnaMercancia">
                                <div class="accordion-body">
                                    <form @submit.prevent="(tipo === 'trip') ? postMercancia(mercancia) : postMercanciaCotizacion(mercancia)">
                                        <div class="row">
                                            <div class="col-lg-6 mb-3">
                                                <label for="">Producto</label>
                                                <input type="text" class="form-control" v-model="mercancia.producto" @keyup="searchProducto(mercancia.producto)" required>
                                                <div class="list">
                                                    <ul>
                                                        <li v-for="(item, index) in productos" :key="index" @click="setProducto(item)">
                                                            <a>{{ item.clave_STCC }} - {{item.descripcion}}</a>
                                                        </li> 
                                                    </ul>
                                                </div>
                                            </div>      
                                            <div class="col-lg-6 mb-3">
                                                <label for="">Unidad de Medida</label>
                                                <input type="text" class="form-control" v-model="mercancia.unidadMedida" @keyup="searchUnidadMedida(mercancia.unidadMedida)" required>
                                                <div class="list">
                                                    <ul>
                                                        <li v-for="(item, index) in unidadesMedida" :key="index" @click="setUnidadMedida(item)">
                                                            <a>{{ item.claveUnidad }} - {{item.nombre}}</a>
                                                        </li> 
                                                    </ul>
                                                </div>
                                            </div>    
                                            <div class="col-lg-6 mb-3">
                                                <label for="">Cantidad</label>
                                                <input type="text" class="form-control" v-model="mercancia.cantidad" required>
                                            </div>    
                                            <div class="col-lg-6 mb-3">
                                                <label for="">Peso</label>
                                                <input type="text" class="form-control" v-model="mercancia.peso" required>
                                            </div>    
                                            <div class="col-lg-6 mb-3" v-if="tipo_viaje === 'importacion' || tipo_viaje === 'exportacion'">
                                                <label for="">Fraccion Arancelaria</label>
                                                <input type="text" class="form-control" v-model="mercancia.fraccionArancelaria" required>
                                            </div>    
                                            <div class="col-lg-6 mb-3" v-if="tipo_viaje === 'importacion'">
                                                <label for="">Pedimento</label>
                                                <input type="text" class="form-control" v-model="mercancia.pedimento"  required>
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
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingArchivoMercancias">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseArchivoMercancias" aria-expanded="false" aria-controls="panelsStayOpen-collapseArchivoMercancias">
                                    Subir archivo de mercancias
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseArchivoMercancias" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingArchivoMercancias">
                                <div class="accordion-body">
                                    <div>
                                        <form @submit.prevent="(tipo === 'trip') ? submitFile() : submitFileCotizacion()">
                                            <div class="row">
                                                <div v-if="!showPreloaderUploadFile" class="col-lg-12 mb-3">
                                                    <input type="file" name="mercancias" class="form-control" @change="handleFileUpload( $event )" required>
                                                </div>
                                                <div v-if="showPreloaderUploadFile" class="col-lg-12 d-flex justify-content-center flex-column align-items-center">
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p>Subiendo mercancias...</p>
                                                </div>
                                                <div v-if="!showPreloaderUploadFile" class="col-lg-12 d-flex justify-content-end">
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
                    </div>                    
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
        ...mapState('tripModule', ['mercancia', 'productos', 'unidadesMedida'])
    },
    props: {
        tipo: {
            type: String,
            default: 'trip'
        },
        tipo_viaje: {
            type: String
        }
    },
    data() {
        return {
            fileMercancias: null,
            showPreloaderUploadFile: false
        }
    },
    methods: {
        ...mapMutations('tripModule', ['showModal', 'setProducto', 'setUnidadMedida']),
        ...mapActions('tripModule', ['postMercancia', 'searchProducto', 'searchUnidadMedida', 'uploadMercanciasFromFile']),
        ...mapActions('cotizacionModule', ['postMercanciaCotizacion' , 'uploadMercanciasFromFileCotizacion']),
        handleFileUpload(event){
            this.fileMercancias = event.target.files[0];
        },
        async submitFile() {
            let formData = new FormData();
            formData.append('file', this.fileMercancias);
            try {
                this.showPreloaderUploadFile = true;
                await this.uploadMercanciasFromFile(formData);
                this.showPreloaderUploadFile = false;
            } catch (error) {
                console.log(error);
            }

        },
        async submitFileCotizacion() {
            let formData = new FormData();
            formData.append('file', this.fileMercancias);
            try {
                this.showPreloaderUploadFile = true;
                await this.uploadMercanciasFromFileCotizacion(formData);
                this.showPreloaderUploadFile = false;
            } catch (error) {
                console.log(error);
            }
        }
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