/**
 * Creates a base64 encoded email with PDF attachment for sending an offer
 * @param emailBody The body text of the email
 * @param pdfFile The PDF file as a base64 string
 * @param recipientEmail The email address of the recipient
 * @param subject The subject of the email
 * @returns A base64 encoded email string ready to be sent
 */
export const createOfferEmail = (
    emailBody: string,
    pdfFile: string,
    recipientEmail: string,
    subject: string
): string => {
    const boundary = 'foo_bar_baz';
    const emailParts = [
        {
            mimeType: 'text/plain',
            content: emailBody
        },
        {
            mimeType: 'application/pdf',
            filename: 'offre.pdf',
            content: pdfFile
        }
    ];

    const messageParts = [
        `From: me`,
        `To: ${recipientEmail}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary=${boundary}`,
        '',
        emailParts.map(part => {
            return [
                `--${boundary}`,
                `Content-Type: ${part.mimeType}`,
                part.filename ? `Content-Disposition: attachment; filename=${part.filename}` : '',
                `Content-Transfer-Encoding: base64`,
                '',
                part.content,
                ''
            ].filter(Boolean).join('\r\n');
        }).join('\r\n'),
        `--${boundary}--`
    ];

    return Buffer.from(messageParts.join('\r\n')).toString('base64');
};
