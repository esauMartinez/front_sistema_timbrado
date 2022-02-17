import Trip from '../classes/trip';
import Empresa from '../classes/empresa'
import router from '../router';

let empresa = new Empresa();

const empresaModule = {
    namespaced: true,
    state: () => ({
        empresa,
        empresas: [],
        regimen_fiscal: [
            { clave: 601, descripcion: 'General de Ley Personas Morales' },
            { clave: 603, descripcion: 'Personas Morales con Fines no Lucrativos' },
            { clave: 605, descripcion: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
            { clave: 606, descripcion: 'Arrendamiento' },
            { clave: 607, descripcion: 'Régimen de Enajenación o Adquisición de Bienes' },
            { clave: 608, descripcion: 'Demás ingresos' },
            { clave: 609, descripcion: 'Consolidación' },
            { clave: 610, descripcion: 'Residentes en el Extranjero sin Establecimiento Permanente en México' },
            { clave: 611, descripcion: 'Ingresos por Dividendos(socios y accionistas)' },
            { clave: 612, descripcion: 'Personas Físicas con Actividades Empresariales y Profesionales' },
            { clave: 614, descripcion: 'Ingresos por intereses' },
            { clave: 615, descripcion: 'Régimen de los ingresos por obtención de premios' },
            { clave: 616, descripcion: 'Sin obligaciones fiscales' },
            { clave: 620, descripcion: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
            { clave: 621, descripcion: 'Incorporación Fiscal' },
            { clave: 622, descripcion: '"Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras"' },
            { clave: 622, descripcion: '"Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras"' },
            { clave: 623, descripcion: 'Opcional para Grupos de Sociedades' },
            { clave: 624, descripcion: 'Coordinados' },
            { clave: 628, descripcion: 'Hidrocarburos' },
            { clave: 629, descripcion: 'De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales' },
            { clave: 630, descripcion: 'Enajenación de acciones en bolsa de valores' }
        ]
    }),
    mutations: {
        setEmpresas(state, empresas) {
            state.empresas = empresas;
        },
        setEmpresa(state, empresa) {
            state.empresa = empresa;
        },
        // setRegimenFiscal(state, payload) {
        //     state.empresa.clave_regimen_fiscal = payload.clave;
        //     state.empresa.descripcion_regimen_fiscal = payload.descripcion;
        // }
    },
    actions: {
        async getEmpresas({ commit }) {
            try {
                let response = await empresa.findAll();
                commit('setEmpresas', response);
            } catch (error) {
                empresa.error(error);
            }
        },
        async getEmpresa({ commit }, payload) {
            try {
                let response = await empresa.findById(payload);
                commit('setEmpresa', response);
            } catch (error) {
                router.push('/root');
                empresa.error(error);
            }
        },
        async postEmpresa({ dispatch, state }, payload) {
            try {
                let response = await empresa.create(payload);
                empresa.success(response.msg);
                router.push('/root');
                state.empresa = new Empresa();
                dispatch('getEmpresas');
            } catch (error) {
                empresa.error(error);
            }
        },
        async putEmpresa({ dispatch }, payload) {
            try {
                let response = await empresa.update(payload);
                empresa.success(response.msg);
                router.push('/root');
                dispatch('getEmpresas');
            } catch (error) {
                empresa.error(error);
            }
        },
        async updatePermisoSCT({}, payload) {
            try {
                const data = JSON.parse(localStorage.getItem('usuario'));
                payload.empresa = data.empresa;
                let response = await empresa.updatePermisoSCT(payload);
                empresa.success(response.msg);
            } catch (error) {
                empresa.error(error);   
            }
        },
        async uploadLogo({ state, dispatch }, payload) {
            try {
                let formData = new FormData();
                formData.append('logo', payload);
                let response = await empresa.uploadLogoEmpresa(formData);
                empresa.success(response.msg);
                dispatch('getEmpresa', state.empresa.uuid);
            } catch (error) {
                empresa.error(error);
            }
        },
        async crearUsuarioEmpresa({}, payload) {
            try {
                let response = await empresa.uploadUser(payload);
                empresa.success(response.msg);
            } catch (error) {
                empresa.error(error);
            }
        }
    }
}

export default empresaModule;

