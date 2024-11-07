import { Component, OnInit } from '@angular/core';
import { ArticleJson, BrandJson, CategoryJson } from 'src/app/shared/models/article-json';


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
 
  articlesClass = ArticleJson;
  categoryClass = BrandJson;
  brandClass = CategoryJson

  articleFields =  [
    { key: 'name', label: 'Nombre' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'price', label: 'Precio' }
  ];

  stockFields =  [
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripcion' }
  ];

  categoryCustomParams = { size:5 };


  articlesColumns = ['Nombre', 'Cantidad', 'Precio'];
  stockColumns = ['Nombre', 'Descripcion'];


  apiUrlArticles = 'http://localhost:8086/secure/articles/';
  apiUrlCategory = 'http://localhost:8086/secure/category/';
  apiUrlBrand = 'http://localhost:8086/secure/brands/';

  constructor() {}

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
