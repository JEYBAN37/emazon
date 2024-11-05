import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/molecules/login-form/login-form.component';
import { AdminPageComponent } from './components/template/admin-page/admin-page.component';
import { MarketplaceComponent } from './components/template/marketplace-component/marketplace-component.component';
import { BuyPageComponent } from './components/template/buy-page/buy-page.component';

const routes: Routes = [
  { path: '', component: BuyPageComponent },
  { path: 'panel-admin', component: AdminPageComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
