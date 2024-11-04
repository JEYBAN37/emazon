import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/services/article-service';
import { BrandService } from 'src/app/shared/services/brand-service';
import { CategoryService } from 'src/app/shared/services/category-service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
  stockServiceCategory : CategoryService
  stockServiceBrand : BrandService
  stockServiceArticle : ArticleService
  
  constructor(
    private categoryServiceInstance: CategoryService,
    private brandServiceInstance :BrandService,
    private articlesServiceIsntance : ArticleService
  ) {
    this.stockServiceCategory = categoryServiceInstance;
    this.stockServiceBrand =  brandServiceInstance;// Asigna el servicio en el constructor
    this.stockServiceArticle = articlesServiceIsntance;
  }

  ngOnInit(): void {
  }


  tabs = [
    { label: 'Categorias', component: 'CategoryForm' },
    { label: 'Marcas', component: 'ArticleForm' },
    { label: 'Articulos', component: 'BrandForm' },
  ];

  selectedTab = 0;

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
