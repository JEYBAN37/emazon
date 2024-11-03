import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabelComponent } from './components/atoms/label/label.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CardCategoryComponent } from './components/molecules/card-category/card-category.component';
import { CardBrandComponent } from './components/molecules/card-brand/card-brand.component';
import { CardArticleComponent } from './components/molecules/card-article/card-article.component';
import { CardUserAuxComponent } from './components/molecules/card-user-aux/card-user-aux.component';
import { InputComponent } from './components/atoms/input/input.component';
import { TextInputComponent } from './components/atoms/text-input/text-input.component';
import { PanelAdminComponent } from './components/organisms/panel-admin/panel-admin.component';
import { CardGetBrandsComponent } from './card-get-brands/card-get-brands.component';
import { CardGetCategoriesComponent } from './components/molecules/card-get-categories/card-get-categories.component';


@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    InputComponent,
    LabelComponent,
    CardCategoryComponent,
    CardBrandComponent,
    CardArticleComponent,
    CardUserAuxComponent,
    PanelAdminComponent,
    CardGetBrandsComponent,
    CardGetCategoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
