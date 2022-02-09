import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CEventsComponent } from 'src/components/c-events/c-events.component';
import { CQrscanComponent } from 'src/components/c-qrscan/c-qrscan.component';
import { AccessGuardGuard } from 'src/guard/access-guard.guard';
import { CHomeComponent} from 'src/components/c-home/c-home.component';
const routes: Routes = [
  //{ path: '', redirectTo: 'sst', pathMatch: 'full' },
  { path: 'panel', component: CHomeComponent},
  { path: 'scan', component: CQrscanComponent},
  { path: 'control', component: CEventsComponent, canActivate: [AccessGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
