import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Cliente {
    constructor(
        id = '',
        razon_social = '',
        origen = 'nacional',
        codigo_postal = '',
        colonia = '',
        municipio = '',
        estado = '',
        pais = '',
        calle = '',
        exterior = '',
        interior = '',
        rfc = '',
        tax_id = '',
        email = '',
        metodo_pago = '',
        forma_pago = '',
        uso_CFDI = ''
    ) {
        this.id = id;
        this.razon_social = razon_social;
        this.origen = origen;
        this.codigo_postal = codigo_postal;
        this.colonia = colonia; 
        this.municipio = municipio;
        this.estado = estado;
        this.pais = pais;
        this.calle = calle;
        this.exterior = exterior;
        this.interior = interior;
        this.rfc = rfc;
        this.tax_id = tax_id;
        this.email = email;
        this.metodo_pago = metodo_pago;
        this.forma_pago = forma_pago;
        this.uso_CFDI = uso_CFDI;
    }
    
    searchCp(codigo_postal) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/find-codigos/${codigo_postal}`, token()).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }

}


export default Cliente;