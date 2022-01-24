import { CEventsService } from './../components/c-events/c-events.service';
import { HttpErrorMessageboxService } from './../error-handler/http-error-messagebox.service';
import { HttpErrorHandlerService } from './../error-handler/http-error-handler.service';
import { CQrscanService } from './../components/c-qrscan/c-qrscan.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module/material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    CQrscanComponent,
    CEventsComponent
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
    HttpClientModule
  ],
  providers: [
    CQrscanService,
    HttpErrorHandlerService,
    HttpErrorMessageboxService,
    CEventsService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: LOCALE_ID, useValue: "ja-JP" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

