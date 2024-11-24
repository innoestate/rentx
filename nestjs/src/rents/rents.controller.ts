import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { OwnersService } from '../owners/owners.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { EstatesService } from '../estates/estates.service';
import { createRentReciptPdf } from './rents.business';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';


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

@Controller('api/rents')
export class RentsController {

    constructor(private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('pdf')
    downloadRentReceipt(@Req() req, @Res() res) {

        const { id } = req.query;

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return from(createRentReciptPdf(estate, owner, lodger));
            }),
            map(rentReceipt => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
                res.send(rentReceipt)
            })
        );
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('email')
    sendRentReceipt(@Req() req, @Res() res) {

        const { id } = req.query;

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return from(createRentReciptPdf(estate, owner, lodger));
            }),
            switchMap(rentReceipt => {
                
                const oauth2Client = new google.auth.OAuth2();
                oauth2Client.setCredentials({
                    access_token: req.user.googleAccessToken,
                    refresh_token: req.user.googleRefreshToken,
                });

                const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

                const emailParts = [
                    {
                      mimeType: 'text/plain',
                      content: 'Votre quittance de loyer est en pièce jointe.'
                    },
                    {
                      mimeType: 'application/pdf',
                      filename: 'quittance.pdf',
                      content: (rentReceipt as any).toString('base64')
                    }
                  ];

                const base64EncodedEmail = createEmail(req.user.email, 'Quittance', emailParts);

                const request = {
                    userId: 'me',
                    resource: {
                      raw: base64EncodedEmail
                    }
                  };
                
                  try {
                    return from(gmail.users.messages.send(request)).pipe(
                        map(response => {
                            return { statusCode: 200, body: JSON.stringify(response.data) };
                        })
                    )
                  } catch (error) {
                    console.error('Error sending email:', error);
                    return of({ statusCode: 500, body: JSON.stringify(error) });
                  }

            })
        );

    }

}