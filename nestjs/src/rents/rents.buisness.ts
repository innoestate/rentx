import * as fs from 'fs';
import * as pdfkit from 'pdfkit';
import { Estate } from 'src/estates/estate.entity';

export const createRentReciptPdf = async () => {

    return new Promise((resolve, reject) => {

        const doc = initDoc();
        runStream(doc, null, document => resolve(document));

        doc.text('hello world!');
        
        finish(doc);
    });

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