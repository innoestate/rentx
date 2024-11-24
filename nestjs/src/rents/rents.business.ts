import * as fs from 'fs';
import * as pdfkit from 'pdfkit';
import { Estate_Db } from '../estates/estate-db.model';
import { Estate } from '../estates/estate.entity';
import { Lodger_Db } from '../lodgers/lodger-db.model';
import { Owner_Db } from '../owners/owners-db.model';

export const createRentReciptPdf = async () => {//estate: Estate_Db, owners: Owner_Db[], lodgers: Lodger_Db[]) => {

    return new Promise((resolve, reject) => {

        const doc = initDoc();
        runStream(doc, null, document => resolve(document));



        doc.text('hello world!');

        finish(doc);
    });

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