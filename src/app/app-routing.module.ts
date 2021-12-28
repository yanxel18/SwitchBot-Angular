import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CQrscanComponent } from 'src/components/c-qrscan/c-qrscan.component';
const routes: Routes = [
  //{ path: '', redirectTo: 'sst', pathMatch: 'full' },
  { path: 'home', component: CQrscanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
