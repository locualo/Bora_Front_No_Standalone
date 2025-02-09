import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPalmaresComponent } from './vista-palmares/vista-palmares.component';
import { GlobalCorredorComponent } from './global-corredor/global-corredor.component';
import { AnadirLogroComponent } from './anadir-logro/anadir-logro.component';

const routes: Routes = [
  { path: 'vista-palmares', component: VistaPalmaresComponent },
  { path: 'global-corredor', component: GlobalCorredorComponent },
  { path: 'anadir-logro', component: AnadirLogroComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }