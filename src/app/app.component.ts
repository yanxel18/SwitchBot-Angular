import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import * as Selectors from '../store/selector';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AppService]
})
export class AppComponent implements OnDestroy, OnInit {
  currentTime = new Date();
  year = this.currentTime.getFullYear();
  title = 'switchbot-angular';
  mobileQuery: MediaQueryList;
  WorkerInfo: Models.WorkerInfo[] = [];
  userSignedIn$: boolean | undefined;
  private _mobileQueryListener: () => void;
  querySubscription: Subscription[] = [];
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialog,
    private appService: AppService,
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

  ngOnInit(): void {
    this.initializedState();
  }

  async initializedState(): Promise<void> {

    this.querySubscription.push(this.store.select(Selectors.getSignIn).subscribe(async (data) => {
      this.userSignedIn$ = data;
      await this.appService.getAccountInfo().refetch();
      this.querySubscription.push(this.appService.getAccountInfo().valueChanges.subscribe(({ data }) => {
        const { AccountInfo } = data;
        if (data?.AccountInfo) {
          if (AccountInfo.length > 0) {
            this.store.dispatch(Actions.LoadWorkerInfo({ payload: AccountInfo }));
            this.store.dispatch(Actions.SetSignin({ payload: true }));
            this.router.navigate(['panel']);
          }
        }
      }));
      this.querySubscription.push(this.store.select(Selectors.getWorkerInfo).subscribe((data) => {
        this.WorkerInfo = data;
      }));
    }));


  }
  async backButton(): Promise<void> {
    this.querySubscription.push(this.store.select(Selectors.getSignIn).subscribe(data => {
      this.userSignedIn$ = data;
    }));
    this.store.dispatch(Actions.LoadWorkerInfo({ payload: [] }));
    this.store.dispatch(Actions.SetSignin({ payload: false }));
    this.removeItems();
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
    const p = msg.includes('400') ? true : false;
    const c = msg.includes('Permission Denied');
    const a = msg.includes('QRスキャン');
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showCloseButton: true,
      showConfirmButton: false,
      backdrop: true,
      timer: 5000
    });
    Toast.fire({
      icon: 'error',
      text: m
    });
    if (u) this.unAuthorized();
    else if (c) this.unAuthorizedUser();
    else if(a) this.scanError();
    else if(p) this.switchBotError();
  }
  private switchBotError(): void {
    this.errorSound();
  }
  private unAuthorized(): void {
    this.errorSound();
    this.dialogRef.closeAll();
    this.router.navigate(['scan']);
  }
  private errorSound(): void{
    const audio = new Audio();
    audio.src = "../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }
  private scanError(): void {
    this.errorSound();
    this.store.dispatch(Actions.SetScan({ payload: false }));
  }

  private unAuthorizedUser(): void {
    this.errorSound();
    this.dialogRef.closeAll();
    this.router.navigate(['scan']);
  }
  private removeItems(): void {
    this.store.dispatch(Actions.LoadWorkerInfo({ payload: [] }))
    localStorage.removeItem("UserNoket");
    localStorage.removeItem("WName");
    localStorage.removeItem("GID");
    localStorage.removeItem("Machine");
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.querySubscription.forEach(x => x.unsubscribe());
  }
}
