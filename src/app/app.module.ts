import { DialogService } from './../components/c-home-dialog/s-dialog-service/dialog.service';
import { Reducer } from './../store/reducer';
import { CEventsService } from './../components/c-events/c-events.service';
import { HttpErrorMessageboxService } from './../error-handler/http-error-messagebox.service';
import { HttpErrorHandlerService } from './../error-handler/http-error-handler.service';
import { CQrscanService } from './../components/c-qrscan/c-qrscan.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module/material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeJa from '@angular/common/locales/ja';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { registerLocaleData } from '@angular/common';
import { HideKeyboardModule } from 'hide-keyboard';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CQrscanComponent } from '../components/c-qrscan/c-qrscan.component';
import { HttpClientModule } from '@angular/common/http';
import { CEventsComponent } from '../components/c-events/c-events.component';
import { CHomeComponent } from '../components/c-home/c-home.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DSwitchbotViewComponent } from '../components/c-home-dialog/d-switchbot-view/d-switchbot-view.component';
import { DSwitchbotEditComponent } from '../components/c-home-dialog/d-switchbot-edit/d-switchbot-edit.component';
import { DSwitchbotRegComponent } from '../components/c-home-dialog/d-switchbot-reg/d-switchbot-reg.component';
import { DRaspiRegComponent } from '../components/c-home-dialog/d-raspi-reg/d-raspi-reg.component';
import { DRaspiEditComponent } from '../components/c-home-dialog/d-raspi-edit/d-raspi-edit.component';
import { DRaspiViewComponent } from '../components/c-home-dialog/d-raspi-view/d-raspi-view.component';
import { DMachineEditComponent } from '../components/c-home-dialog/d-machine-edit/d-machine-edit.component';
import { DMachineViewComponent } from '../components/c-home-dialog/d-machine-view/d-machine-view.component';
import { DMachineRegComponent } from '../components/c-home-dialog/d-machine-reg/d-machine-reg.component';
import { DAccountRegComponent } from '../components/c-home-dialog/d-account-reg/d-account-reg.component';
import { DAccountViewComponent } from '../components/c-home-dialog/d-account-view/d-account-view.component';
import { DAccountEditComponent } from '../components/c-home-dialog/d-account-edit/d-account-edit.component';
import { CQrpageComponent } from '../components/c-qrpage/c-qrpage.component';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    CQrscanComponent,
    CEventsComponent,
    CHomeComponent,
    DSwitchbotViewComponent,
    DSwitchbotEditComponent,
    DSwitchbotRegComponent,
    DRaspiRegComponent,
    DRaspiEditComponent,
    DRaspiViewComponent,
    DMachineEditComponent,
    DMachineViewComponent,
    DMachineRegComponent,
    DAccountRegComponent,
    DAccountViewComponent,
    DAccountEditComponent,
    CQrpageComponent
  ],
  imports: [
    BrowserModule,
    NgxTrimDirectiveModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HideKeyboardModule,
    HttpClientModule,
    StoreModule.forRoot({ SwitchbotState: Reducer}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    CQrscanService,
    HttpErrorHandlerService,
    HttpErrorMessageboxService,
    CEventsService,
    DialogService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: LOCALE_ID, useValue: "ja-JP" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

