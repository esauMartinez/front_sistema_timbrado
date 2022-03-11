import axios from 'axios'
import { url } from '../services/url'
import Swal from 'sweetalert2'
import token from '../services/token'

class Remolque {
    constructor(
        id = '',
        numero_economico = '',
        placa = '',
        estus = true,
        marca = '',
        clase = '',
        numero_serie = '',
        numero_poliza = '',
        vencimiento_poliza = '',
        modelo = '',
        subtipo = ''
    ){
        this.id = id;
        this.numero_economico = numero_economico;
        this.placa = placa;
        this.estus = estus;
        this.marca = marca;
        this.clase = clase;
        this.numero_serie = numero_serie;
        this.numero_poliza = numero_poliza;
        this.vencimiento_poliza = vencimiento_poliza;
        this.modelo = modelo;
        this.subtipo = subtipo;
    }
}

export default Remolque;