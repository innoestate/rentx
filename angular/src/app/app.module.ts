import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ng-zorro
import { CalendarFill, CheckCircleFill, CheckOutline, CloseCircleFill, DatabaseFill, DeleteFill, EyeFill, FileDoneOutline, FormOutline, HourglassFill, LockFill, MailOutline, MessageFill, QuestionCircleFill, StopFill, SwapLeftOutline, SwapOutline, ToolFill, TrophyFill } from '@ant-design/icons-angular/icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CallbackComponent } from './views/common/pages/callback/callback.component';
import { DeviceGuard } from './core/guards/device.guard';
import { UserEffects } from './core/store/user/user.effects';
import { userReducer } from './core/store/user/user.reducers';
import { LoginComponent } from './views/common/pages/login/login.component';

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
      DeleteFill,
      MailOutline,
      ToolFill,
      DatabaseFill,
      QuestionCircleFill,
      MessageFill,
      CalendarFill,
      EyeFill,
      StopFill,
      HourglassFill,
      CloseCircleFill,
      SwapOutline,
      CheckCircleFill,
      CheckOutline,
      FileDoneOutline,
      TrophyFill,
      LockFill,
      SwapLeftOutline,
      FormOutline
    ]),
    NzLayoutModule,
    NzDropDownModule,
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  exports: [
    NzIconModule
  ],
  providers: [
    DeviceGuard,
    DeviceDetectorService,
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
