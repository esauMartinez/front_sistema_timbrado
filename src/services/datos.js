const metodo_pago = [
    { clave: 'PUE', descripcion: 'Pago en una sola exhibición' },
    { clave: 'PPD', descripcion: 'Pago en parcialidades o diferido' }
];

const uso_cfdi = [
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
];

const forma_pago = [
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
];

const configuracion = [
    { clave: 'VL', descripcion: 'Vehículo ligero de carga(2 llantas en el eje delantero y 2 llantas en el eje trasero)' },
    { clave: 'C2', descripcion: 'Camión Unitario(2 llantas en el eje delantero y 4 llantas en el eje trasero)' },
    { clave: 'C3', descripcion: 'Camión Unitario(2 llantas en el eje delantero y 6 o 8 llantas en los dos ejes traseros)' },
    { clave: 'C2R2', descripcion: 'Camión - Remolque(6 llantas en el camión y 8 llantas en remolque)' },
    { clave: 'C3R2', descripcion: 'Camión - Remolque(10 llantas en el camión y 8 llantas en remolque)' },
    { clave: 'C2R3', descripcion: 'Camión - Remolque(6 llantas en el camión y 12 llantas en remolque)' },
    { clave: 'C3R3', descripcion: 'Camión - Remolque(10 llantas en el camión y 12 llantas en remolque)' },
    { clave: 'T2S1', descripcion: 'Tractocamión Articulado(6 llantas en el tractocamión, 4 llantas en el semirremolque)' },
    { clave: 'T2S2', descripcion: 'Tractocamión Articulado(6 llantas en el tractocamión, 8 llantas en el semirremolque)' },
    { clave: 'T2S3', descripcion: 'Tractocamión Articulado(6 llantas en el tractocamión, 12 llantas en el semirremolque)' },
    { clave: 'T3S1', descripcion: 'Tractocamión Articulado(10 llantas en el tractocamión, 4 llantas en el semirremolque)' },
    { clave: 'T3S2', descripcion: 'Tractocamión Articulado(10 llantas en el tractocamión, 8 llantas en el semirremolque)' },
    { clave: 'T3S3', descripcion: 'Tractocamión Articulado(10 llantas en el tractocamión, 12 llantas en el semirremolque)' },
    { clave: 'T2S1R2', descripcion: 'Tractocamión Semirremolque - Remolque(6 llantas en el tractocamión, 4 llantas en el semirremolque y 8 llantas en el remolque)' },
    { clave: 'T2S2R2', descripcion: 'Tractocamión Semirremolque - Remolque(6 llantas en el tractocamión, 8 llantas en el semirremolque y 8 llantas en el remolque)' },
    { clave: 'T2S1R3', descripcion: 'Tractocamión Semirremolque - Remolque(6 llantas en el tractocamión, 4 llantas en el semirremolque y 12 llantas en el remolque)' },
    { clave: 'T3S1R2', descripcion: 'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 4 llantas en el semirremolque y 8 llantas en el remolque)' },
    { clave: 'T3S1R3', descripcion: 'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 4 llantas en el semirremolque y 12 llantas en el remolque)' },
    { clave: 'T3S2R2', descripcion: 'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 8 llantas en el semirremolque y 8 llantas en el remolque)' },
    { clave: 'T3S2R3', descripcion: 'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 8 llantas en el semirremolque y 12 llantas en el remolque)' },
    { clave: 'T3S2R4', descripcion: 'Tractocamión Semirremolque - Remolque(10 llantas en el tractocamión, 8 llantas en el semirremolque y 16 llantas en el remolque)' },
    { clave: 'T2S2S2', descripcion: 'Tractocamión Semirremolque - Semirremolque(6 llantas en el tractocamión, 8 llantas en el semirremolque delantero y 8 llantas en el semirremolque trasero)' },
    { clave: 'T3S2S2', descripcion: 'Tractocamión Semirremolque - Semirremolque(10 llantas en el tractocamión, 8 llantas en el semirremolque delantero y 8 llantas en el semirremolque trasero)' },
    { clave: 'T3S3S2', descripcion: 'Tractocamión Semirremolque - Semirremolque(10 llantas en el tractocamión, 12 llantas en el semirremolque delantero y 8 llantas en el semirremolque trasero)' },
    { clave: 'OTROEVGP', descripcion: 'Especializado de carga Voluminosa y / o Gran Peso' },
    { clave: 'OTROSG', descripcion: 'Servicio de Grúas' },
    { clave: 'GPLUTA', descripcion: 'Grúa de Pluma Tipo A' },
    { clave: 'GPLUTB', descripcion: 'Grúa de Pluma Tipo B' },
    { clave: 'GPLUTC', descripcion: 'Grúa de Pluma Tipo C' },
    { clave: 'GPLUTD', descripcion: 'Grúa de Pluma Tipo D' },
    { clave: 'GPLATA', descripcion: 'Grúa de Plataforma Tipo A' },
    { clave: 'GPLATB', descripcion: 'Grúa de Plataforma Tipo B' },
    { clave: 'GPLATC', descripcion: 'Grúa de Plataforma Tipo C' },
    { clave: 'GPLATD', descripcion: 'Grúa de Plataforma Tipo D' },
];

const arr_subtipo = [
    { clave: 'CTR001', descripcion: 'Caballete' },
    { clave: 'CTR002', descripcion: 'Caja' },
    { clave: 'CTR003', descripcion: 'Caja Abierta' },
    { clave: 'CTR004', descripcion: 'Caja Cerrada' },
    { clave: 'CTR005', descripcion: 'Caja De Recolección Con Cargador Frontal' },
    { clave: 'CTR006', descripcion: 'Caja Refrigerada' },
    { clave: 'CTR007', descripcion: 'Caja Seca' },
    { clave: 'CTR008', descripcion: 'Caja Transferencia' },
    { clave: 'CTR009', descripcion: 'Cama Baja o Cuello Ganso' },
    { clave: 'CTR010', descripcion: 'Chasis Portacontenedor' },
    { clave: 'CTR011', descripcion: 'Convencional De Chasis' },
    { clave: 'CTR012', descripcion: 'Equipo Especial' },
    { clave: 'CTR013', descripcion: 'Estacas' },
    { clave: 'CTR014', descripcion: 'Góndola Madrina' },
    { clave: 'CTR015', descripcion: 'Grúa Industrial' },
    { clave: 'CTR016', descripcion: 'Grúa ' },
    { clave: 'CTR017', descripcion: 'Integral' },
    { clave: 'CTR018', descripcion: 'Jaula' },
    { clave: 'CTR019', descripcion: 'Media Redila' },
    { clave: 'CTR020', descripcion: 'Pallet o Celdillas' },
    { clave: 'CTR021', descripcion: 'Plataforma' },
    { clave: 'CTR022', descripcion: 'Plataforma Con Grúa' },
    { clave: 'CTR023', descripcion: 'Plataforma Encortinada' },
    { clave: 'CTR024', descripcion: 'Redilas' },
    { clave: 'CTR025', descripcion: 'Refrigerador' },
    { clave: 'CTR026', descripcion: 'Revolvedora' },
    { clave: 'CTR027', descripcion: 'Semicaja' },
    { clave: 'CTR028', descripcion: 'Tanque' },
    { clave: 'CTR029', descripcion: 'Tolva' },
    { clave: 'CTR031', descripcion: 'Volteo' },
    { clave: 'CTR032', descripcion: 'Volteo Desmontable' }
];

const items_sidenav = [
    { nombre: 'Ajustes', url: '/ajustes', icon: 'cog', permisos: ['USER_ADMIN_SYSTEM'] },
    { nombre: 'Inicio', url: '/home', icon: 'home', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Clientes', url: '/cliente', icon: 'address-card', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Operadores', url: '/operador', icon: 'hard-hat', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Remolques', url: '/remolque', icon: 'truck-loading', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Unidades', url: '/unidad', icon: 'truck-moving', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Patios', url: '/patio', icon: 'map-marker-alt', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Servicios', url: '/servicio', icon: 'file-alt', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Cotizaciones', url: '/cotizacion', icon: 'dollar-sign', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Trips', url: '/trip', icon: 'file-invoice', permisos: ['USER_ADMIN_SYSTEM', 'USER_STD_SYSTEM'] },
    { nombre: 'Usuarios', url: '/usuario', icon: 'users', permisos: ['USER_ADMIN_SYSTEM'] },
    { nombre: 'Mis cotizaciones', url: '/cotizacion', icon: 'file-invoice', permisos: ['USER_CLIENTE_SYSTEM'] },
];


module.exports = {
    metodo_pago,
    uso_cfdi,
    forma_pago,
    configuracion,
    arr_subtipo,
    items_sidenav
}