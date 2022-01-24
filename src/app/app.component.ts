import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { onError } from "@apollo/client/link/error";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  title = 'switchbot-angular';
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    apollo: Apollo,
    httpLink: HttpLink) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    const http = httpLink.create({ uri: 'http://192.168.44.201:3000/graphql' });
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

    })
  }
  public errorlink(): ApolloLink {
    return onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => this.errorMSG(message));
      if (networkError) this.errorMSG(networkError.message);
    }
    )
  }

  private errorMSG(msg: string): void {
    const m = msg.includes('failure') ? 'サーバー接続問題が発生しました！' : msg;
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

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
