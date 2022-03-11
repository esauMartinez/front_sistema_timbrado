import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Unidad {
    constructor(
        id = '',
        numero_economico = '',
        matricula = '',
        numero_serie = '',
        aseguradora = '',
        numero_poliza = '',
        vencimiento_poliza = '',
        marca = '',
        modelo = '',
        clase = '',
        estatus = true,
        configuracion_vehicular = ''
    ){
        this.id = id
        this.numero_economico = numero_economico
        this.matricula = matricula
        this.numero_serie = numero_serie
        this.aseguradora = aseguradora
        this.numero_poliza = numero_poliza
        this.vencimiento_poliza = vencimiento_poliza
        this.marca = marca
        this.modelo = modelo
        this.clase = clase
        this.estatus = estatus
        this.configuracion_vehicular = configuracion_vehicular
    }
}

export default Unidad;