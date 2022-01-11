<template>
    <div class="row">
        <div :class="{ 'col-lg-6': true, 'mb-3': true, color: true }">
            <label for="" :class="{ 'form-label': true, color: true }">{{title}}</label>
            <input type="text" class="form-control" v-model="patio.nombre" required :disabled="ver">
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Codigo Postal</label>
            <input type="text" class="form-control" v-model="patio.codigo_postal" 
                    required :disabled="ver"
                    v-if="!show">
            <input type="text" class="form-control" v-model="patio.codigo_postal" 
                    @keyup="(title === 'Origen') ? searchCpOrigen(patio.codigo_postal) : searchCpDestino(patio.codigo_postal)" required :disabled="ver"
                    v-if="show">
            <div class="list">
                <ul>
                    <li v-for="(item, index) in codigos" :key="index">
                        <a @click="(title === 'Origen') ? setCodigoPostalOrigen(item) : setCodigoPostalDestino(item)">{{ item.d_asenta }}</a>
                    </li> 
                </ul>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Colonia</label>
            <input type="text" class="form-control" v-model="patio.colonia" required disabled>
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Municipio</label>
            <input type="text" class="form-control" v-model="patio.municipio" required disabled>
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Estado</label>
            <input type="text" class="form-control" v-model="patio.estado" required disabled v-if="show">

            <select v-if="!show" class="form-control" v-model="patio.c_estado" @change="modifyEstado(patio.c_estado)">
                <option v-for="(item, index) in estadosUSA" :key="index" :value="item.abreviatura">{{ item.estado }}</option>
            </select>
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Pais</label>
            <input type="text" class="form-control" v-model="patio.pais" required disabled>
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Calle</label>
            <input type="text" class="form-control" v-model="patio.calle" required :disabled="ver">
        </div>
        <div class="col-lg-6 mb-3">
            <label for="" class="form-label">Numero Exterior</label>
            <input type="text" class="form-control" v-model="patio.exterior" required :disabled="ver">
        </div>
        <div class="col-lg-12 mb-3">
            <label for="" class="form-label">Numero Interior</label>
            <input type="text" class="form-control" v-model="patio.interior" :disabled="ver">
        </div>
    </div>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'formCotizacion',
    props: {
        title: {
            type: String
        },
        patio: {
            type: Object
        },
        codigos: {
            type: Array
        },
        ver: {
            type: Boolean
        },
        color: {
            type: String
        },
        tipo_viaje: {
            type: String
        },
        show: {
            type: Boolean
        }
    },
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
    methods: {
        ...mapMutations('cotizacionModule', ['setCodigoPostalOrigen', 'setCodigoPostalDestino']),
        ...mapActions('cotizacionModule', ['searchCpOrigen', 'searchCpDestino']),
        modifyEstado(estado) {
            const findEstado = this.estadosUSA.find(x => x.abreviatura === estado);
            this.patio.estado = findEstado.estado;
            this.patio.c_estado = findEstado.abreviatura;

            console.log(this.patio);
        }
    },
}
</script>