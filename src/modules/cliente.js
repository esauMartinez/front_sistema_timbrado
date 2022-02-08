import router from '../router'
import Cliente from '../classes/cliente'
let cliente = new Cliente()
import store from '../store'

const clienteModule = {
    namespaced: true,
    state: () => ({
        cliente,
        clientes: [],
        copia: [],
        metodo_pago: [
            { clave: 'PUE', descripcion: 'Pago en una sola exhibición' },
            { clave: 'PPD', descripcion: 'Pago en parcialidades o diferido' }
        ],
        uso_cfdi: [
            { clave: 'G01', descripcion: 'Adquisición de mercancías' },
            { clave: 'G02', descripcion: 'Devoluciones, descuentos o bonificaciones' },
            { clave: 'G03', descripcion: 'Gastos en general' },
            { clave: 'I01', descripcion: 'Construcciones' },
            { clave: 'I02', descripcion: 'Mobiliario y equipo de oficina por inversiones' },
            { clave: 'I03', descripcion: 'Equipo de transporte' },
            { clave: 'I04', descripcion: 'Equipo de computo y accesorios' },
            { clave: 'I05', descripcion: 'Dados, troqueles, moldes, matrices y herramental' },
            { clave: 'I06', descripcion: 'Comunicaciones telefónicas' },
            { clave: 'I07', descripcion: 'Comunicaciones satelitales' },
            { clave: 'I08', descripcion: 'Otra maquinaria y equipo' },
            { clave: 'D01', descripcion: 'Honorarios médicos, dentales y gastos hospitalarios' },
            { clave: 'D02', descripcion: 'Gastos médicos por incapacidad o discapacidad' },
            { clave: 'D03', descripcion: 'Gastos funerales' },
            { clave: 'D04', descripcion: 'Donativos' },
            { clave: 'D05', descripcion: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)' },
            { clave: 'D06', descripcion: 'Aportaciones voluntarias al SAR' },
            { clave: 'D07', descripcion: 'Primas por seguros de gastos médicos' },
            { clave: 'D08', descripcion: 'Gastos de transportación escolar obligatoria' },
            { clave: 'D09', descripcion: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones' },
            { clave: 'D10', descripcion: 'Pagos por servicios educativos (colegiaturas)' },
            { clave: 'P01', descripcion: 'Por definir' }
        ],
        forma_pago: [
            { clave: '01', descripcion: 'Efectivo' },
            { clave: '02', descripcion: 'Cheque nominativo' },
            { clave: '03', descripcion: 'Transferencia electrónica de fondos' },
            { clave: '04', descripcion: 'Tarjeta de crédito' },
            { clave: '05', descripcion: 'Monedero electrónico' },
            { clave: '06', descripcion: 'Dinero electrónico' },
            { clave: '08', descripcion: 'Vales de despensa' },
            { clave: '12', descripcion: 'Dación en pago' },
            { clave: '13', descripcion: 'Pago por subrogación' },
            { clave: '14', descripcion: 'Pago por consignación' },
            { clave: '15', descripcion: 'Condonación' },
            { clave: '17', descripcion: 'Compensación' },
            { clave: '23', descripcion: 'Novación' },
            { clave: '24', descripcion: 'Confusión' },
            { clave: '25', descripcion: 'Remisión de deuda' },
            { clave: '26', descripcion: 'Prescripción o caducidad' },
            { clave: '27', descripcion: 'A satisfacción del acreedor' },
            { clave: '28', descripcion: 'Tarjeta de débito' },
            { clave: '29', descripcion: 'Tarjeta de servicios' },
            { clave: '30', descripcion: 'Aplicación de anticipos' },
            { clave: '31', descripcion: 'Intermediario pagos' },
            { clave: '99', descripcion: 'Por definir' },
        ]
    }),
    mutations: {
        setClientes(state, clientes) {
            state.clientes = clientes;
            state.copia = clientes;
        },
        setCliente(state, cliente) {
            state.cliente = cliente;
            store.commit('tripModule/setCliente', cliente);
        },
        searchCliente(state, razon_social) {
            let array = [];
            if (razon_social !== '') {
                state.copia.filter(x => {
                    if (x.razon_social.toUpperCase().indexOf(razon_social.toUpperCase()) > -1) {
                        array.push(x);
                    }
                });

                state.clientes = array;
            } else {
                state.clientes = state.copia;
            }            
        },
        setCodigoPostal(state, postal) {
            console.log(postal);
            state.cliente.colonia = postal.d_asenta;
            state.cliente.municipio = postal.D_mnpio;
            state.cliente.estado = postal.d_estado;
            state.cliente.pais = postal.pais;
            this.state.postalModule.codigos = [];
        }
    },
    actions: {
        async getClientes({ commit }) {
            try {
                let response = await cliente.findAll();
                commit('setClientes', response);
            } catch (error) {
                cliente.error(error);
            }
        },
        async getCliente({ commit }, payload) {
            try {
                let response = await cliente.findById(payload);
                commit('setCliente', response);
            } catch (error) {
                // console.log(error);
                // cliente.error(error);
            }
        },
        async postCliente({ dispatch, state }, payload) {
            try {
                let response = await cliente.create(payload);
                cliente.success(response.msg);
                router.push('/cliente');
                state.cliente = new Cliente();
                dispatch('getClientes');
            } catch (error) {
                cliente.error(error);
            }
        },
        async putCliente({ dispatch }, payload) {
            try {
                let response = await cliente.update(payload);
                cliente.success(response.msg);
                router.push('/cliente');
                dispatch('getClientes');
            } catch (error) {
                cliente.error(error);
            }
        },
        async deleteCliente({ dispatch }, payload) {
            try {
                let response = await cliente.delete(payload);
                cliente.success(response.msg);
                dispatch('getClientes');
            } catch (error) {
                cliente.error(error);
            }
        }
    }
}

export default clienteModule;

