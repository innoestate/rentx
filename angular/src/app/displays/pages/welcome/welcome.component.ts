import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    standalone: false
})
export class WelcomeComponent {
  email: string = '';
  isSubmitting: boolean = false;

  constructor(private http: HttpClient, private message: NzMessageService) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.isSubmitting = true;
    this.http.post(`${environment.apiURL}/alpha/addUser`, { email: this.email })
      .subscribe(response => {
        this.message.success('Merci! Nous reviendrons vers vous pour dès que nous vous aurons donné les accès');
        this.isSubmitting = false;
      }, error => {
        this.message.error('Une erreur est survenue. Contactez nous par email pour plus d’informations.');
        this.isSubmitting = false;
      });
  }
}
