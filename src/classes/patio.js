import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Patio {
    constructor(
        id ='',
        nombre ='',
        codigo_postal = '',
        colonia = '',
        c_colonia = '',
        referencia = '',
        municipio ='',
        c_municipio = '',
        estado = '',
        c_estado = '',
        pais = '',
        c_pais = '',
        calle = '',
        exterior = '',
        interior = '',
        localidad = '',
        tipo = 'nacional'
    ) {
        this.id = id
        this.nombre = nombre
        this.codigo_postal = codigo_postal
        this.colonia = colonia
        this.c_colonia = c_colonia
        this.referencia = referencia
        this.municipio = municipio
        this.c_municipio = c_municipio
        this.estado = estado
        this.c_estado = c_estado
        this.pais = pais
        this.c_pais = c_pais
        this.calle = calle
        this.exterior = exterior
        this.interior = interior
        this.localidad = localidad
        this.tipo = tipo
    }
}

export default Patio;