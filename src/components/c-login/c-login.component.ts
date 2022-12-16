import { Component, OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';
import * as Models from '../../interface/Models';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CLoginService } from './c-login.service';
import { Router } from '@angular/router';
import * as Actions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppService } from '../../app/app.service';
@Component({
  selector: 'app-c-login',
  templateUrl: './c-login.component.html',
  styleUrls: ['./c-login.component.sass'],
  providers: [CLoginService, AppService]
})
export class CLoginComponent implements OnDestroy {
  querySubscription: Subscription[] = [];
  isLoggedIn!: boolean;
  constructor(
    private router: Router,
    private cloginservice: CLoginService,
    private appService: AppService,
    private store: Store<Models.SwitchbotState>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.initialized();
  }
  async initialized(): Promise<void> {
    await this.store.dispatch(Actions.LoadWorkerInfo({ payload: [] }));
    await this.store.dispatch(Actions.SetSignin({ payload: false }));
    this.isLoggedIn = false;
    this.removeItems();

  }

  loginForm = new UntypedFormGroup({
    GIDFull: new UntypedFormControl('', [Validators.required]),
    Pass: new UntypedFormControl('', [Validators.required]),
  });


  login(): void {
    if (this.loginForm.valid) {
      this.loginInitialize();
    }
  }

  loginInitialize(): void {
    this.unsubscribeF();
    this.querySubscription.push(this.cloginservice.loginUser(this.loginForm.value)
      .subscribe(({ data }) => {
        if (data?.accessInfo) {
          const { Noket, UserInfo } = data.accessInfo
          if (Noket && UserInfo) {
            const convertedUserInfo: Models.WorkerInfo[] = [];
            convertedUserInfo.push(UserInfo);
            this.setItems(data);
            this.store.dispatch(Actions.LoadWorkerInfo({ payload: convertedUserInfo }));
            this.store.dispatch(Actions.SetSignin({ payload: true }));
            this.router.navigate(['panel']);
          } else this.removeItems();
        }
      })
    );
  }
  userName(): string | null {
    if (this.loginForm.get("GIDFull")?.hasError('required')) {
      return '空白は禁止！';
    }
    return null;
  }

  userPass(): string | null {
    if (this.loginForm.get("Pass")?.hasError('required')) {
      return '空白は禁止！';
    }
    return null;
  }
  private removeItems(): void {
    this.store.dispatch(Actions.LoadWorkerInfo({ payload: [] }))
    localStorage.removeItem("UserNoket");
    localStorage.removeItem("WName");
    localStorage.removeItem("GID");
    localStorage.removeItem("Machine");
  }

  private setItems(data: Models.AccessInfo): void {
    const { Noket, UserInfo } = data.accessInfo;
    if (Noket) localStorage.setItem("UserNoket", Noket);
    if (UserInfo) {
      localStorage.setItem("WName", UserInfo.FullName);
      localStorage.setItem("GID", UserInfo.GIDFull);
    }
  }
  unsubscribeF(): void {
    this.querySubscription.forEach(x => x.unsubscribe());
  }
  ngOnDestroy(): void {
    this.unsubscribeF();
  }
}
