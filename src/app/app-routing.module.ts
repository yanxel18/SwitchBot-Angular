import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CEventsComponent } from 'src/components/c-events/c-events.component';
import { CQrscanComponent } from 'src/components/c-qrscan/c-qrscan.component';
const routes: Routes = [
  //{ path: '', redirectTo: 'sst', pathMatch: 'full' },
  { path: 'scan', component: CQrscanComponent},
  { path: 'control', component: CEventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
