import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ng-zorro
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './core/store/user/user.reducers';
import { UserEffects } from './core/store/user/user.effects';
import { environment } from 'src/environments/environment';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DeviceGuard } from './core/guards/device.guard';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RentService } from './common/services/rents.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MailOutline } from '@ant-design/icons-angular/icons';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzAlertModule,
    NzMessageModule,
    NzTypographyModule,
    NzIconModule.forRoot([
      MailOutline
    ]),
    NzLayoutModule,
    NzDropDownModule,
    NzModalModule,
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    DeviceGuard,
    DeviceDetectorService,
    RentService,
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
