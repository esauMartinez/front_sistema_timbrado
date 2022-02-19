import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Trip from '../classes/trip'

const trip = new Trip();

export const generatePDF = async (data) => {

    const doc = new jsPDF()

    var imgData = `data:image/jpeg;base64,${data.empresa.logoB64}`
    doc.addImage(imgData, 'JPEG', 15, 10, 30, 20)

    var width = doc.internal.pageSize.getWidth()
    doc.setFontSize(12)
    doc.text('CFDI DE INGRESO CON COMPLEMENTO CARTA PORTE', width / 2, 10, { align: 'center' })
    doc.text(data.empresa.razon_social, width / 2, 17, { align: 'center' })
    doc.text(data.empresa.calle + ' ' + '#' + data.empresa.numero_interior, width / 2, 24, { align: 'center' })
    doc.text(data.empresa.estado + ', ' + data.empresa.pais, width / 2, 31, { align: 'center' })
    doc.text(`R.F.C ${data.empresa.rfc}`, width / 2, 38, { align: 'center' })
    
    let y = 40;

    doc.autoTable({
        startY: y + 5,
        // tableWidth: 190,
        // margin: { left: 10 },
        styles: {
            halign: 'center',
            fontSize: 8
        },
        theme: 'grid',
        head: [
            [{ content: 'INFORMACION DEL CLIENTE', colSpan: 5 }],
            ['CLIENTE', 'CALLE', 'COLONIA', 'ESTADO', 'RFC']
        ],
        body: [
            [data.cliente.razon_social, data.cliente.calle, data.cliente.colonia, data.cliente.estado, data.cliente.rfc]
        ]
    })

    doc.autoTable({
        // tableWidth: 190,
        // margin: { left: 10 },
        styles: {
            halign: 'center',
            fontSize: 8
        },
        theme: 'grid',
        head: [
            [{ content: 'INFORMACION DEL TRIP', colSpan: 5 }],
            ['TRIP', 'OPERADOR', 'UNIDAD', 'PLACA', 'CAJA']
        ],
        body: [
            [await positions(data.folio.toString()), `${data.operador.nombre} ${data.operador.paterno} ${data.operador.materno}`, data.unidad.numero_economico, data.unidad.matricula, data.remolque.numero_economico ]
        ]
    })

    doc.autoTable({
        // tableWidth: 190,
        // margin: { left: 10 },
        styles: {
            halign: 'center',
            fontSize: 8
        },
        theme: 'grid',
        head: [
            [{ content: 'PATIOS', colSpan: 2 }],
            ['ORIGEN', 'DESTINO' ]
        ],
        body: [
            [data.origen.nombre, data.destino.nombre],
            [data.origen.calle, data.destino.calle],
            [data.origen.codigo_postal, data.destino.codigo_postal],
            [`${data.origen.municipio}, ${data.origen.estado} ${data.origen.pais}`, `${data.destino.municipio}, ${data.destino.estado} ${data.destino.pais}`]
        ]
    })


    doc.autoTable({
        // tableWidth: 190,
        // margin: { left: 10 },
        styles: {
            halign: 'center',
            fontSize: 8
        },
        theme: 'grid',
        head: [
            [{ content: 'CONCEPTOS', colSpan: 4 }],
            ['CANTIDAD', 'CLAVE PRODUCTO', 'CLAVE UNIDAD', 'CONCEPTO']
        ],
        body: await getConceptos(data.conceptos)
    })

    doc.autoTable({
        // tableWidth: 190,
        // margin: { left: 10 },
        styles: {
            halign: 'center',
            fontSize: 8
        },
        theme: 'grid',
        head: [
            [{ content: 'MERCANCIAS', colSpan: 4 }],
            ['PRODUCTO', 'DESCRIPCION', 'UNIDAD DE MEDIDA', 'PESO (KG)']
        ],
        body: await getMercancias(data.mercancias)
    })

    let timbre = await trip.getTimbre(data.trip);

    doc.autoTable({
        styles: {
            halign: 'center',
            overflow: 'linebreak',
            fontSize: 7
        },
        headStyles: {
            halign: 'center'
        },
        theme: 'grid',
        bodyStyles: { minCellHeight: 25, minCellWidth: 70 },
        head: [
            ['CODIGO QR','Cadena Original de Complemento de Certificado Digital de SAT']
        ],
        body: [
            ['', timbre.cadenaOriginalSAT],
        ],
        didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 0) {
                var base64Img = `data:image/png;base64,${timbre.qrCode}`
                doc.addImage(base64Img, 'png', data.cell.x + 25, data.cell.y + 2, 20, 20)
            }
        },
        
    })

    doc.autoTable({
        styles: {
            halign: 'center',
            overflow: 'linebreak',
            fontSize: 7
        },
        headStyles: {
            halign: 'center'
        },
        theme: 'grid',
        head: [['Sello digital del CFDI']],
        body: [
            [timbre.selloCFDI]
        ],
    })

    doc.autoTable({
        styles: {
            halign: 'center',
            overflow: 'linebreak',
            fontSize: 7
        },
        headStyles: {
            halign: 'center'
        },
        theme: 'grid',
        head: [['Sello del SAT']],
        body: [
            [timbre.selloSAT]
        ],
    })


    doc.autoTable({
        styles: {
            halign: 'center',
            overflow: 'linebreak',
            fontSize: 7
        },
        theme: 'grid',
        head: [['Certificado SAT', 'Folio Fiscal', 'Fecha Certificado', 'RFC PAC']],
        body: [
            [timbre.noCertificadoSAT, timbre.uuid, timbre.fechaTimbrado]
        ],
    })

    doc.save(`CP-${data.trip}.pdf`)
}

const getConceptos = (data) => {
    return new Promise((resolve, reject) => {
        const conceptos = [];

        for (let i = 0; i < data.length; i++) {
            const x = data[i];

            const concepto = [
                1,
                x.clave_concepto,
                'E48',
                x.concepto
            ]

            conceptos.push(concepto);
        }

        resolve(conceptos);
    });
}


const getMercancias = (data) => {
    return new Promise((resolve, reject) => {
        const mercancias = [];
        
        for (let i = 0; i < data.length; i++) {
            const x = data[i];

            const mercancia = [
                x.claveProducto,
                x.producto,
                x.unidadMedida,
                x.peso
            ]

            mercancias.push(mercancia);
        }

        resolve(mercancias);
    });
}


const positions = (trip) => {
    return new Promise((resolve, reject) => {
        var a = "0000000000";
        var posiciones = a.length;
        var string_trip = trip.length;
        var cadena;
    
        for (let i = 0; i < posiciones; i++) {
            cadena = posiciones - string_trip;
        }
        var newCadena = '';

        for (let i = 0; i < cadena; i++) {
            newCadena = newCadena.concat('0');
        }

        resolve(`${newCadena}${trip}`);
    });
}
