import axios from 'axios';
import { url } from '../services/url'
import Swal from 'sweetalert2';

class Mercancia {
    constructor(
        id = '',
        producto = 'asdasd',
        claveProducto = '',
        unidadMedida = '',
        claveUnidadMedida = '',
        cantidad = '',
        peso = '',
        fraccionArancelaria = '',
        uuidComercioExt = '',
        trip = ''
    ) {
        this.id = id;
        this.producto = producto;
        this.claveProducto = claveProducto;
        this.unidadMedida = unidadMedida;
        this.claveUnidadMedida = claveUnidadMedida;
        this.cantidad = cantidad;
        this.peso = peso;
        this.fraccionArancelaria = fraccionArancelaria;
        this.uuidComercioExt = uuidComercioExt;
        this.trip = trip;
    }

    findMercanciasTrip(trip) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/mercancia/${trip}`).then(response => resolve(response.data)).catch(error => reject(error))
        });
    }
}


export default Mercancia;