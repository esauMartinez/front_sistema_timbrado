<template>
    <form>
        <div class="row">
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="patio.nombre" required>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Tipo</label>
                <select class="form-control" v-model="patio.tipo" @change="verifyTipoPatio(patio.tipo)" required>
                    <option value="nacional">Nacional</option>
                    <option value="extranjero">Extranjero</option>
                </select>
            </div>
            <div class="col-lg-4 mb-3">
                <label for="" class="form-label">Codigo Postal</label>
                <input type="text" class="form-control" v-model="patio.codigo_postal" @keyup="searchCp(patio.codigo_postal)" required>
                <div class="list">
                    <ul>
                        <li v-for="(item, index) in codigos" :key="index">
                            <a @click="setCodigoPostal(item)">{{ item.d_asenta }}</a>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Localidad</label>
                <input type="text" class="form-control" v-model="patio.localidad" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Colonia</label>
                <input type="text" class="form-control" v-model="patio.colonia" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Municipio</label>
                <input type="text" class="form-control" v-model="patio.municipio" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Estado</label>
                <input v-if="patio.tipo === 'nacional'" type="text" class="form-control" v-model="patio.estado" required disabled>

                <select v-else class="form-control" v-model="patio.c_estado" @change="modifyEstado(patio.c_estado)">
                    <option v-for="(item, index) in estadosUSA" :key="index" :value="item.abreviatura">{{ item.estado }}</option>
                </select>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Pais</label>
                <input v-if="patio.tipo === 'nacional'" type="text" class="form-control" v-model="patio.pais" required disabled>

                <input v-else type="text" class="form-control" v-model="patio.pais" required disabled>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Calle</label>
                <input type="text" class="form-control" v-model="patio.calle" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Exterior</label>
                <input type="text" class="form-control" v-model="patio.exterior" required>
            </div>
            <div class="col-lg-3 mb-3">
                <label for="" class="form-label">Numero Interior</label>
                <input type="text" class="form-control" v-model="patio.interior">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 mb-3">
                <label for="" class="form-label">Referencia</label>
                <textarea type="text" class="form-control" v-model="patio.referencia"></textarea>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    name: 'formPatio',
    data() {
        return {
            estadosUSA: [
                { estado: 'ALABAMA', abreviatura: 'AL' },
                { estado: 'ALASKA', abreviatura: 'AK' },
                { estado: 'ARIZONA', abreviatura: 'AZ' },
                { estado: 'ARKANSAS', abreviatura: 'AR' },
                { estado: 'CALIFORNIA', abreviatura: 'CA' },
                { estado: 'CAROLINA DEL NORTE', abreviatura: 'NC' },
                { estado: 'CAROLINA DEL SUR', abreviatura: 'SC' },
                { estado: 'COLORADO', abreviatura: 'CO' },
                { estado: 'CONNECTICUT', abreviatura: 'CT' },
                { estado: 'DAKOTA DEL NORTE', abreviatura: 'ND' },
                { estado: 'DAKOTA DEL SUR', abreviatura: 'SD' },
                { estado: 'DELAWARE', abreviatura: 'DE' },
                { estado: 'FLORIDA', abreviatura: 'FL' },
                { estado: 'GEORGIA', abreviatura: 'GA' },
                { estado: 'HAWAI', abreviatura: 'HI' },
                { estado: 'IDAHO', abreviatura: 'ID' },
                { estado: 'ILLINOIS', abreviatura: 'IL' },
                { estado: 'INDIANA', abreviatura: 'IN' },
                { estado: 'IOWA', abreviatura: 'IA' },
                { estado: 'KANSAS', abreviatura: 'KS' },
                { estado: 'KENTUCKY', abreviatura: 'KY' },
                { estado: 'LUISIANA', abreviatura: 'LA' },
                { estado: 'MAINE', abreviatura: 'ME' },
                { estado: 'MARYLAND', abreviatura: 'MD' },
                { estado: 'MASSACHUSETTS', abreviatura: 'MA' },
                { estado: 'MICHIGAN', abreviatura: 'MI' },
                { estado: 'MINNESOTA', abreviatura: 'MN' },
                { estado: 'MISISIPI', abreviatura: 'MS' },
                { estado: 'MISURI', abreviatura: 'MO' },
                { estado: 'MONTANA', abreviatura: 'MT' },
                { estado: 'NEBRASKA', abreviatura: 'NE' },
                { estado: 'NEVADA', abreviatura: 'NV' },
                { estado: 'NUEVA JERSEY', abreviatura: 'NJ' },
                { estado: 'NUEVA YORK', abreviatura: 'NY' },
                { estado: 'NUEVO HAMPSHIRE', abreviatura: 'NH' },
                { estado: 'NUEVO MEXICO', abreviatura: 'NM' },
                { estado: 'OHIO', abreviatura: 'OH' },
                { estado: 'OKLAHOMA', abreviatura: 'OK' },
                { estado: 'OREGON', abreviatura: 'OR' },
                { estado: 'PENSILVANIA', abreviatura: 'PA' },
                { estado: 'RHODE ISLAND', abreviatura: 'RI' },
                { estado: 'TENNESSEE', abreviatura: 'TN' },
                { estado: 'TEXAS', abreviatura: 'TX' },
                { estado: 'UTAH', abreviatura: 'UT' },
                { estado: 'VERMONT', abreviatura: 'VT' },
                { estado: 'VIRGINIA', abreviatura: 'VA' },
                { estado: 'VIRGINIA OCCIDENTAL', abreviatura: 'WV' },
                { estado: 'WASHINGTON', abreviatura: 'WA' },
                { estado: 'WISCONSIN', abreviatura: 'WI' },
                { estado: 'WYOMING', abreviatura: 'WY' }
            ]
        }
    },
    computed: {
        ...mapState('patioModule', ['patio']),
        ...mapState('postalModule', ['codigos'])
    },
    methods: {
        ...mapMutations('patioModule', ['setCodigoPostal']),
        ...mapActions('postalModule', ['searchCp']),
        verifyTipoPatio(tipo) {
            if (tipo === 'extranjero') {
                console.log('se le pone no aplica a todo alv');
                console.log(tipo);
                this.patio.localidad = 'N/A';
                this.patio.colonia = 'N/A';
                this.patio.c_colonia = 'N/A';
                this.patio.municipio = 'N/A';
                this.patio.c_municipio = 'N/A';
                this.patio.pais = 'Estados Unidos';
                this.patio.c_pais = 'USA';
            } else {
                this.patio.estado = '';
                this.patio.pais = '';
            }
        },
        modifyEstado(estado) {
            const findEstado = this.estadosUSA.find(x => x.abreviatura === estado);

            this.patio.estado = findEstado.estado;
            this.patio.c_estado = findEstado.abreviatura;
        }
    }
}
</script>

<style>
    textarea {
        resize: none;
    }
</style>
