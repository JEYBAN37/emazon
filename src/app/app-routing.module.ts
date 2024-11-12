import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/template/admin-page/admin-page.component';
import { LoginFormComponent } from './components/organisms/login-form/login-form.component';
import { PanelRegisterComponent } from './components/organisms/panel-register/panel-register.component';
import { PageEmploimentComponent } from './components/template/page-emploiment/page-emploiment.component';
import { PageStoreComponent } from './components/template/page-store/page-store.component';
import { CarComponent } from './components/organisms/car/car.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'register', component: PanelRegisterComponent },
  { path: 'marketplace', component: PageStoreComponent },
  { path: 'panel-admin', component: AdminPageComponent },
  { path: 'panel-emploiment', component: PageEmploimentComponent },
  {path: 'car', component: CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
