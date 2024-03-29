import io from 'socket.io-client';
import { urlSocket } from '../services/url';
import store from '../store'

class Socket {
    constructor(
        socket = ''
    ) {
        this.socket = socket;
    }
    
    connectToWorkspace(namespace, room) {
        this.socket = io(`${urlSocket}/${namespace}`);

        this.joinToRoom(room);

        this.messageEnviada();

        this.messageCotizada();

        this.messageAutorizada();
    }

    joinToRoom(room) {
        this.socket.emit('joinToRoom', room);
    }

    /**
     * creada: es cuando el cliente crea una nueva cotizacion pero todavia no la llena
     * enviada: es cuando el cliente ya lleno la cotizacion  y la guarda
     * cotizada: es cuando la empresa ya le pone un precio
     * aprobada: es cuando el cliente esta de acuerdo con el precio de la cotizacion
     * cancelada: es las cotizaciones que se cancelaron
     */

    messageCreada() {
        this.socket.emit('messageCreada');
    }

    messageEnviada() {
        this.socket.on('messageEnviada', data => {
            alert(data);
            store.dispatch('cotizacionModule/getCotizaciones', 'enviada');
        });
    }
    
    messageCotizar() {
        this.socket.emit('messageCotizada');
    }
    
    messageCotizada() {
        this.socket.on('messageCotizada', data => {
            alert(data);
            store.dispatch('cotizacionModule/getCotizaciones', 'cotizada');
        });
    }

    messageAutorizar() {
        this.socket.emit('messageAutorizada');
    }

    messageAutorizada() {
        this.socket.on('messageAutorizada', data => {
            alert(data);
            store.dispatch('cotizacionModule/getCotizaciones', 'enviada');
        });
    }


    disconnectToWorkspace() {
        console.log('se desconecta alv');
        this.socket.close('disconnect');
    }
}

const socket = new Socket();

export default socket;