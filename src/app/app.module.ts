import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelAdminComponent } from './components/organisms/panel-admin/panel-admin.component';
import { InputComponent } from './components/atoms/input/input.component';
import { TextInputComponent } from './components/atoms/text-input/text-input.component';
import { CardCategoryComponent } from './components/molecules/card-category/card-category.component';
import { CardBrandComponent } from './components/molecules/card-brand/card-brand.component';
import { CardArticleComponent } from './components/molecules/card-article/card-article.component';
import { CardGetStockComponent } from './components/molecules/card-get-stock/card-get-stock.component';
import { NavBarComponent } from './components/molecules/nav-bar/nav-bar.component';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { AdminPageComponent } from './components/template/admin-page/admin-page.component';
import { BuyPageComponent } from './components/template/buy-page/buy-page.component';
import { AuthInterceptor } from './shared/services/factory-api/auth-interceptor.service';
import { AlertMessageDisplayComponent } from './components/atoms/alert-message-display/alert-message-display.component';
import { SubmitButtonComponent } from './components/atoms/submit-button/submit-button.component';
import { LoginFormComponent } from './components/organisms/login-form/login-form.component';
import { FormSessionComponent } from './components/molecules/form-session/form-session.component';
import { PanelRegisterComponent } from './components/organisms/panel-register/panel-register.component';
import { PanelSupplyComponent } from './components/organisms/panel-supply/panel-supply.component';
import { NavSearchComponent } from './components/atoms/nav-search/nav-search.component';
import { PanelSearchComponent } from './components/molecules/panel-search/panel-search.component';
import { PageEmploimentComponent } from './components/template/page-emploiment/page-emploiment.component';
import { CardSupplyComponent } from './components/molecules/card-supply/card-supply.component';
import { SendSupplyComponent } from './components/molecules/send-supply/send-supply.component';
import { ResponseSupplyComponent } from './components/molecules/response-supply/response-supply.component';
import { PageStoreComponent } from './components/template/page-store/page-store.component';
import { MarketplaceComponent } from './components/organisms/marketplace-component/marketplace-component.component';
import { CarComponent } from './components/organisms/car/car.component';
import { TarjetBuyComponent } from './components/molecules/tarjet-buy/tarjet-buy.component';
import { CardAuxComponent } from './components/molecules/card-aux/card-aux.component';



@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    InputComponent,
    CardCategoryComponent,
    CardBrandComponent,
    CardArticleComponent,
    PanelAdminComponent,
    CardGetStockComponent,
    NavBarComponent,
    FooterComponent,
    LoginFormComponent,
    AdminPageComponent,
    MarketplaceComponent,
    BuyPageComponent,
    AlertMessageDisplayComponent,
    SubmitButtonComponent,
    FormSessionComponent,
    PanelRegisterComponent,
    PanelSupplyComponent,
    NavSearchComponent,
    PanelSearchComponent,
    PageEmploimentComponent,
    CardSupplyComponent,
    SendSupplyComponent,
    ResponseSupplyComponent,
    PageStoreComponent,
    CarComponent,
    TarjetBuyComponent,
    CardAuxComponent,
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
