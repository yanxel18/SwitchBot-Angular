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
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { onError } from "@apollo/client/link/error";
import Swal from 'sweetalert2';

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => errorMSG(message));
  if (networkError) errorMSG(networkError.message);

function errorMSG(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'エラーメッセージ',
      text: msg
    });
  }
}
);


registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    CQrscanComponent
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
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: LOCALE_ID, useValue: "ja-JP" },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: errorlink.concat(httpLink.create({
            uri: 'http://192.168.44.201:3000/graphql',
          })),
          defaultOptions: {
            watchQuery: {
              errorPolicy: 'all'
            }
          }
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
