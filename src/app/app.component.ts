import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { onError } from "@apollo/client/link/error";
import Swal from 'sweetalert2';
import * as Models from '../interface/Models';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as Actions from '../store/actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as Selectors from '../store/selector';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  currentTime = new Date();
  year = this.currentTime.getFullYear();
  title = 'switchbot-angular';
  mobileQuery: MediaQueryList;
  WorkerInfo: Models.WorkerInfo[] = [];
  subscription: Subscription[] = [];
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialog,
    media: MediaMatcher,
    apollo: Apollo,
    httpLink: HttpLink,
    private store: Store<Models.SwitchbotState>,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    const http = httpLink.create({ uri: environment.gUrl });
    const middleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('UserNoket') || null}`,
        ),
      });
      return forward(operation);
    });
    const Mainlink = middleware.concat(http);
    this.subscription.push(
      this.store.select(Selectors.getWorkerInfo).subscribe((data) => {
        data ? this.WorkerInfo = data : this.WorkerInfo = [];
      }));
    apollo.create({
      cache: new InMemoryCache(),
      link: this.errorlink().concat(Mainlink),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    });
  }
  backButton(): void {
    this.router.navigate(['scan']);
  }
  public errorlink(): ApolloLink {
    return onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => this.errorMSG(message));
      if (networkError) this.errorMSG(networkError.message);
    });
  }

  private errorMSG(msg: string): void {
    const m = msg.includes('failure') ? 'サーバー接続問題が発生しました！' : msg;
    const u = msg.includes('401') ? true : false;
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showCloseButton: true,
      showConfirmButton: false,
      timer: 5000
    });
    Toast.fire({
      icon: 'error',
      text: m
    });
    if (u) this.unAuthorized();
  }
  private unAuthorized(): void {
    this.dialogRef.closeAll();
    this.router.navigate(['scan']);
  }
  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
