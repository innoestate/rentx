import * as fs from 'fs';
import * as pdfkit from 'pdfkit';
const path = require('path');
import { Estate_Db } from '../../estates/estate-db.model';
import { Estate } from '../../estates/estate.entity';
import { Lodger_Db } from '../../lodgers/lodger-db.model';
import { Owner_Db } from '../../owners/owners-db.model';
import { from, map } from 'rxjs';
import { calculateMonthlyRent, calculateRent } from '../rents.utils';
import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';

export const createRentReciptPdf = async (estate: Estate_Db, owner: Owner_Db, lodger: Lodger_Db, startDate_?: string, endDate_?: string) => {

    return new Promise((resolve, reject) => {

        try {

            const fontPath = path.join(__dirname, '../../assets/fonts/times_bold.ttf');

            const doc = initDoc();
            runStream(doc, null, document => resolve(document));

            const { startDate, endDate, rent, charges, totalRent, street, ownerZipAndCity, lodgerZipAndCity, madeAt, signature } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

            const pageWidth = doc.page.width;
            const marginLeft = 50;
            const textHeight = 15;
            const padding = 5;
            const tabCenter = marginLeft + (pageWidth - marginLeft * 2) / 2;
            let y = 50;

            doc.text(owner.name, marginLeft, y);
            doc.text(owner.street, marginLeft, y += textHeight);
            doc.text(ownerZipAndCity, marginLeft, y += textHeight);

            y = 50;
            // Informations du destinataire
            doc.text(lodger.name, 0, y, { align: 'right' });
            doc.text(street, 0, y += textHeight, { align: 'right' });
            doc.text(lodgerZipAndCity, 0, y += textHeight, { align: 'right' });


            y += textHeight * 4;
            // En-tête de la quittance
            doc.font(fontPath).text('QUITTANCE DE LOYER', marginLeft, y += textHeight, { underline: true, align: 'center' });
            doc.font('Times-Roman').text(`Période: du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())}`, marginLeft, y += textHeight * 1.5, { align: 'center' });
            doc.text(street + ' ' + lodgerZipAndCity, marginLeft, y += textHeight, { align: 'center' });

            let tabTop = y + textHeight * 2;

            doc.moveTo(marginLeft, y += textHeight * 2)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            // Détails du paiement
            doc.font(fontPath).text('PROPRIETAIRE:', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text('LOCATAIRE:', tabCenter + padding, y);

            doc.font('Times-Roman').text(owner.name, marginLeft + padding, y += textHeight);
            doc.text(lodger.name, tabCenter + padding, y);

            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();

            doc.text('Loyer', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text(rent + ' €', tabCenter + padding, y);

            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();

            doc.text('Charges', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text(charges + ' €', tabCenter + padding, y);

            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();

            doc.font(fontPath).text('Total', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.font('Times-Roman').text(totalRent + ' €', tabCenter + padding, y);

            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();

            doc.moveTo(marginLeft, tabTop)
                .lineTo(marginLeft, y)
                .stroke();

            doc.moveTo(tabCenter, tabTop)
                .lineTo(tabCenter, y)
                .stroke();

            doc.moveTo(pageWidth - marginLeft, tabTop)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();

            doc.font('Times-Roman').text(`Je soussigné ${owner.name}, propriétaire du logement désigné ci dessus avoir reçu de la part du locataire l'ensemble des sommes mentionnées au titre du loyer et des charges.`, marginLeft, y += textHeight * 2);
            doc.text(`Fait ${madeAt ? ('à ' + madeAt + ' ') : ''}le ${formatDateFromISOString(new Date().toISOString())}`, marginLeft, y += textHeight * 4);

            doc.text('Le bailleur,', pageWidth - marginLeft * 4, y += textHeight * 2);
            doc.text(owner.name, pageWidth - marginLeft * 4, y += textHeight * 1.5);


            try {
                const matches = signature.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                const imageData = Buffer.from(matches![2], 'base64');
                doc.image(imageData, tabCenter, y += textHeight * 2, { height: 120 });
            } catch (e) {
                console.error('error signature', e);
            }

            finish(doc);

        } catch (e) {
            console.error(e);
            reject(e);
        }

    });

}

export const getRentReceiptInfos = (estate: Estate_Db, owner: Owner_Db, lodger: Lodger_Db, startDate_?: string, endDate_?: string) => {
    let startDate = startDate_ ? new Date(startDate_) : null;
    let endDate = endDate_ ? new Date(endDate_) : null;
    if (!startDate) {
        const currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }
    const rent = estate.rent;
    const charges = estate.charges;
    const rentsByMonths = calculateMonthlyRent(rent, charges, startDate, endDate);
    const totalRent = calculateRent(rent, charges, startDate, endDate);

    const street = estate.street;
    const lodgerZipAndCity = estate.zip + ' ' + estate.city;
    const ownerZipAndCity = owner.zip + ' ' + owner.city;
    const madeAt = estate.city;
    const signature = owner.signature;

    if (!endDate) {
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    }
    return { startDate, endDate, rent, charges, totalRent, rentsByMonths, street, lodgerZipAndCity, ownerZipAndCity, madeAt, signature };
}

export const createRentReceiptEmail = (estate: Estate_filled_Db, startDate: Date, endDate: Date) => {

    return from(createRentReciptPdf(estate, estate.owner, estate.lodger, startDate.toISOString(), endDate.toISOString())).pipe(
        map(rentReceipt => {

            const content = `Bonjour,

            Veuillez trouver en pièce jointe votre quittance de loyer pour la période du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())}.

            Cordialement,
            ${estate.owner.name}`;

            const formattedStartDate = formatDateFromISOString(startDate.toISOString()).replace(/\//g, '-');
            const formattedEndDate = formatDateFromISOString(endDate.toISOString()).replace(/\//g, '-');

            const filename = `quittance-${formattedStartDate}-${formattedEndDate}_${estate.lodger.name.replace(/\s+/g, '_')}-${estate.street.replace(/\s+/g, '_')}.pdf`;

            const emailParts = [
                {
                    mimeType: 'text/plain',
                    content
                },
                {
                    mimeType: 'application/pdf',
                    filename,
                    content: (rentReceipt as any).toString('base64')
                }
            ];

            return createEmail(estate.lodger.email, `Quittance du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())} pour le ${estate.street}`, emailParts);

        })
    )
}

// export const createRentReceiptEmail = (userId: string,owners: Owner_Db[], lodgers: Lodger_Db[], estate: Estate_Db, startDate_?: string, endDate_?: string) => {
//     const owner = owners.find(owner => owner.id === estate.owner_id);
//     const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);

//     const { startDate, endDate, street } = getRentReceiptInfos(estate, owner, lodger);

//     return from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)).pipe(
//         map(rentReceipt => {

//             const content = `Bonjour,

//             Veuillez trouver en pièce jointe votre quittance de loyer pour la période du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())}.

//             Cordialement,
//             ${owner.name}`;

//             const formattedStartDate = formatDateFromISOString(startDate.toISOString()).replace(/\//g, '-');
//             const formattedEndDate = formatDateFromISOString(endDate.toISOString()).replace(/\//g, '-');

//             const filename = `quittance-${formattedStartDate}-${formattedEndDate}_${lodger.name.replace(/\s+/g, '_')}-${street.replace(/\s+/g, '_')}.pdf`;

//             const emailParts = [
//                 {
//                     mimeType: 'text/plain',
//                     content
//                 },
//                 {
//                     mimeType: 'application/pdf',
//                     filename,
//                     content: (rentReceipt as any).toString('base64')
//                 }
//             ];

//             return createEmail(lodger.email, `Quittance du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())} pour le ${estate.street}`, emailParts);

//         })
//     )
// }

const createEmail = (to: string, subject: string, parts: any[]) => {
    const boundary = 'foo_bar_baz';
    const messageParts = [
        `From: me`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary=${boundary}`,
        '',
        `--${boundary}`,
    ];

    parts.forEach((part) => {
        const { mimeType, filename, content } = part;
        messageParts.push(`Content-Type: ${mimeType}`);
        if (filename) {
            messageParts.push(`Content-Disposition: attachment; filename="${filename}"`);
        }
        messageParts.push(`Content-Transfer-Encoding: base64`, '', content, `--${boundary}`);
    });

    messageParts.push('--');

    return Buffer.from(messageParts.join('\n')).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
};

const formatDateFromISOString = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

const initDoc = () => {
    return new pdfkit({
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });
}

const runStream = (doc: any, estate: Estate, callback) => {
    const fileName = 'quittance' + Date.now();
    if (!fs.existsSync('/tmp')) {
        fs.mkdirSync('/tmp');
    }
    const stream = fs.createWriteStream(`/tmp/${fileName}.pdf`);
    stream.on('finish', () => {
        const document = fs.readFileSync(`/tmp/${fileName}.pdf`);
        callback(document);
    });
    doc.pipe(stream);
}

const finish = (doc) => {
    doc.save();
    doc.end();
}