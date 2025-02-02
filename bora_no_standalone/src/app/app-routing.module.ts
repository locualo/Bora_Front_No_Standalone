import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VistaPalmaresComponent } from './vista-palmares/vista-palmares.component';
import { GlobalCorredorComponent } from './global-corredor/global-corredor.component';

const routes: Routes = [
  { path: 'vista-palmares', component: VistaPalmaresComponent },
  { path: 'global-corredor', component: GlobalCorredorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }