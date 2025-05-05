import { Owner } from 'src/app/features/owners/models/owner.model';
import { Prospection } from 'src/app/features/prospections/models/prospection.model';
import { loadImage } from 'src/app/core/utils/image.utils';
//@ts-ignore
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";

const getHeader = (owner: Owner, prospection: Prospection) => {
    const seller = prospection.seller;

    const buildAddressBlock = (entity: any) => {
        if (!entity) return '';

        return [
            entity.name,
            entity.agency,
            entity.street || entity.address,
            entity.zip,
            entity.city,
            entity.email,
            entity.phone
        ]
        .filter(value => value)
        .join('<br>');
    };

    return `
        <table style="width: calc(100% - 20px); padding: 10px; margin-bottom: 20px; table-layout: fixed;">
            <tr>
                <td style="width: 48%; vertical-align: top; padding-right: 2%;">
                    ${buildAddressBlock(owner)}
                </td>
                <td style="width: 48%; vertical-align: top; text-align: right; padding-left: 2%;">
                    ${buildAddressBlock(seller)}
                </td>
            </tr>
        </table>
    `;
};

const getFooter = async (owner: Owner): Promise<string> => {
    if (owner?.signature) {
        await loadImage(owner.signature);
    }

    return `
        <div style="margin-top: 20px;">
            <div>${owner?.name}</div>
            ${owner?.signature ? `<img id="ownerSignatureImage" src="${owner.signature}" alt="Signature" style="max-height: 100px; margin-top: 10px;">` : ''}
        </div>
    `;
};

const buildPdfElement = async (owner: Owner, prospection: Prospection, content: string): Promise<string> => {
    try {
        const header = getHeader(owner, prospection);
        const footer = await getFooter(owner);

        return `
            <html>
                <head><title>Export PDF</title></head>
                <body>
                    ${header}
                    ${content}
                    ${footer}
                </body>
            </html>
        `;
    } catch (err) {
        throw err;
    }
};

const getHtml2PdfOptions = () => ({
    margin: 10,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
});

export const generatePdf = async (owner: Owner, prospection: Prospection, content: string): Promise<ArrayBuffer> => {
    try {
        const htmlElement = await buildPdfElement(owner, prospection, content);
        const options = getHtml2PdfOptions();

        return new Promise((resolve) => {
            html2pdf().set(options).from(htmlElement).toPdf().get('pdf').then((pdf: any) => {
                const pdfData = pdf.output('arraybuffer');
                resolve(pdfData);
            });
        });
    } catch (error) {
        throw error;
    };
};

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export const downloadPdf = async (owner: Owner, prospection: Prospection, content: string): Promise<void> => {
  const htmlElement = await buildPdfElement(owner, prospection, content);
  const options = getHtml2PdfOptions();
  html2pdf().set(options).from(htmlElement).save();
};