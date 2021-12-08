import io from 'socket.io-client';
import store from '../store'

class Socket {
    constructor(
        socket = ''
    ) {
        this.socket = socket;
    }
    
    connectToWorkspace(namespace, room) {
        this.socket = io(`http://localhost:3000/${namespace}`);

        this.joinToRoom(room);

        this.messageEnviada();

        this.messageCotizada();
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
        
    }

    messageAutorizada() {

    }


    disconnectToWorkspace() {
        console.log('se desconecta alv');
        this.socket.emit('disconnect');
    }
}

const socket = new Socket();

export default socket;