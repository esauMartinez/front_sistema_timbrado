import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Operador {
    constructor(
        id = '',
        nombre = '',
        paterno = '',
        materno = '',
        fecha_nacimiento = '',
        fecha_ingreso = '',
        curp = '',
        rfc = '',
        codigo_postal = '',
        colonia = '',
        municipio = '',
        estado = '',
        pais = '',
        calle = '',
        exterior = '',
        interior = '',
        licencia = '',
        vencimiento_licencia = '',
        estatus = ''
    ) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_ingreso = fecha_ingreso;
        this.curp = curp;
        this.estado = estado;
        this.codigo_postal = codigo_postal;
        this.colonia = colonia;
        this.municipio = municipio;
        this.rfc = rfc;
        this.pais = pais;
        this.calle = calle;
        this.exterior = exterior;
        this.interior = interior;
        this.licencia = licencia;
        this.vencimiento_licencia = vencimiento_licencia;
        this.estatus = estatus;
    }

}

export default Operador;