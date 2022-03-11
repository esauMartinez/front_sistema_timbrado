import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Servicio {
    constructor(
        id = '',
        clave = '',
        descripcion = ''
    ) {
        this.id = id;
        this.clave = clave;
        this.descripcion = descripcion;
    }
}


export default Servicio;