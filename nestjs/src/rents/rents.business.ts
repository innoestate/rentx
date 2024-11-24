import * as fs from 'fs';
import * as pdfkit from 'pdfkit';
import { Estate_Db } from '../estates/estate-db.model';
import { Estate } from '../estates/estate.entity';
import { Lodger_Db } from '../lodgers/lodger-db.model';
import { Owner_Db } from '../owners/owners-db.model';

export const createRentReciptPdf = async (estate: Estate_Db, owner: Owner_Db, lodger: Lodger_Db) => {

    return new Promise((resolve, reject) => {

        const doc = initDoc();
        runStream(doc, null, document => resolve(document));


        let startDate = null;
        let endDate = null;
        if (!startDate) {
            const currentDate = new Date();
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        }


        const rent = estate.rent;
        const charges = estate.charges;
        const totalRent = calculateRent(rent, charges, startDate, endDate);
        const street = estate.street;
        const zipAndCity = estate.zip + ' ' + estate.city;
        const madeAt = estate.city;

        const pageWidth = doc.page.width;
        const marginLeft = 50;
        const textHeight = 15;
        const padding = 5;
        const tabCenter = marginLeft + (pageWidth - marginLeft * 2) / 2;
        let y = 50;


        doc.text(owner.name, marginLeft, y);
        doc.text(owner.street, marginLeft, y += textHeight);
        doc.text(owner.city, marginLeft, y += textHeight);

        y = 50;
        // Informations du destinataire
        doc.text(lodger.name, 0, y, { align: 'right' });
        doc.text(street, 0, y += textHeight, { align: 'right' });
        doc.text(zipAndCity, 0, y += textHeight, { align: 'right' });

        y += textHeight * 4;
        // En-tête de la quittance
        doc.font('fonts/times_bold.ttf').text('QUITTANCE DE LOYER', marginLeft, y += textHeight, { underline: true, align: 'center' });
        doc.font('Times-Roman').text(`Période: du ${formatDateFromISOString(startDate)} au ${formatDateFromISOString(endDate)}`, marginLeft, y += textHeight * 1.5, { align: 'center' });
        doc.text(street + ' ' + zipAndCity, marginLeft, y += textHeight, { align: 'center' });

        let tabTop = y + textHeight * 2;

        doc.moveTo(marginLeft, y += textHeight * 2)
            .lineTo(pageWidth - marginLeft, y)
            .stroke();
        // Détails du paiement
        doc.font('fonts/times_bold.ttf').text('PROPRIETAIRE:', marginLeft + padding, y += textHeight * 0.5 + padding);
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

        doc.font('fonts/times_bold.ttf').text('Total', marginLeft + padding, y += textHeight * 0.5 + padding);
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

        finish(doc);
    });

}

const calculateTotalForActualMonth = (estate: Estate_Db) => {
    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return calculateRent(estate.rent, estate.charges, firstDayOfCurrentMonth);
}

const formatDateFromISOString = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

export const calculateRent = (rent: number, charges: number, dateStart: Date, dateEnd?: Date) => {

    let result = 0;
    if (!dateEnd) {
        return rent + charges;
    } else {

        const daysInFirstMonth = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0).getDate();
        const daysInLastMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0).getDate();
        const daysOfFirstMonth = daysInFirstMonth - (dateStart.getDate() + (dateStart.getDate() == 1 ? -1 : 0));
        const daysOfLastMonth = dateEnd.getDate();

        let days = 0;
        if (dateStart.getMonth() == dateEnd.getMonth() && dateStart.getFullYear() === dateEnd.getFullYear()) {
            days = dateEnd.getDate() - (dateStart.getDate() + (dateStart.getDate() == 1 ? -1 : 0));
            result = Math.round((rent + charges) / daysInFirstMonth * days);
        } else {

            if (dateStart.getFullYear() == dateEnd.getFullYear()) {

                const rentForFirstMonth = Math.round((rent + charges) / daysInFirstMonth * daysOfFirstMonth);
                const rentForMonthsBetween = (rent + charges) * (dateEnd.getMonth() - dateStart.getMonth() - 1);
                const rentForLastMonth = Math.round((rent + charges) / daysInLastMonth * daysOfLastMonth);
                result = rentForFirstMonth + rentForMonthsBetween + rentForLastMonth;

            } else {
                const rentForFirstMonth = Math.round((rent + charges) / daysInFirstMonth * daysOfFirstMonth);
                const rentForMonthsBetween = (rent + charges) * (12 - dateStart.getMonth());
                const rentForLastMonth = Math.round((rent + charges) / daysInLastMonth * daysOfLastMonth);
                result = rentForFirstMonth + rentForMonthsBetween + rentForLastMonth;
            }


        }

    }


    return result;
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