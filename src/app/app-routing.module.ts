import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CEventsComponent } from 'src/components/c-events/c-events.component';
import { CQrscanComponent } from 'src/components/c-qrscan/c-qrscan.component';
import { AccessGuardGuard } from 'src/guard/access-guard.guard';
import { CHomeComponent} from 'src/components/c-home/c-home.component';
import { CQrpageComponent } from 'src/components/c-qrpage/c-qrpage.component';
import { CLoginComponent } from 'src/components/c-login/c-login.component';
import { CWorkerselectComponent } from 'src/components/c-workerselect/c-workerselect.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: CLoginComponent},
  { path: 'panel', component: CHomeComponent,canActivate: [AccessGuardGuard] },
  { path: 'panel/qr', component: CQrpageComponent, canActivate: [AccessGuardGuard]},
  { path: 'scan', component: CWorkerselectComponent},
  { path: 'control', component: CEventsComponent, canActivate: [AccessGuardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
