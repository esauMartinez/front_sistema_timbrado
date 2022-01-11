<template>
    <div class="container mt-5">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCertificados" aria-expanded="true" aria-controls="collapseCertificados">
                        Subir Ceritificados
                    </button>
                </h2>
                <div id="collapseCertificados" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <formAjuste></formAjuste>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePassword" aria-expanded="true" aria-controls="collapsePassword">
                        Cambiar Password del sistema
                    </button>
                </h2>
                <div id="collapsePassword" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import formAjuste from '../components/ajustes/formularioCertificado.vue'
export default {
    name: 'ajustes',
    components: {
        formAjuste
    }
}
</script>

