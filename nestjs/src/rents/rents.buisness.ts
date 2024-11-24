import * as fs from 'fs';
import * as pdfkit from 'pdfkit';

export const createRentReciptPdf = () => {

    return new Promise((resolve, reject) => {

        try {
            const doc = new pdfkit({
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });

            const fileName = 'quittance' + Date.now();
            if (!fs.existsSync('/tmp')) {
                fs.mkdirSync('/tmp');
            }
            const stream = fs.createWriteStream(`/tmp/${fileName}.pdf`);
            stream.on('finish', () => {
                const document = fs.readFileSync(`/tmp/${fileName}.pdf`);
                resolve(document);
            });
            doc.pipe(stream);

            doc.text('hello world!');
            doc.save();
            doc.end();

        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}