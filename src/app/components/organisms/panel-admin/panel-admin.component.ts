import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleJson, BrandJson, CategoryJson } from 'src/app/shared/models/article-json';
import { CardGetStockComponent } from '../../molecules/card-get-stock/card-get-stock.component';

interface Tab {
  label: string;
  component: any; // Replace 'any' with the component type when applicable
}


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
 
  articlesClass = ArticleJson;
  categoryClass = BrandJson;
  brandClass = CategoryJson;

  @ViewChild('componenteGetArticle') getArticle!: CardGetStockComponent<any>;
  @ViewChild('componenteGetBrand') getBrand!: CardGetStockComponent<any>;
  @ViewChild('componenteGetCategory') getCategory!: CardGetStockComponent<any>;

  articleFields: { key: string; label: string }[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'price', label: 'Precio' },
    { key: 'brand.name', label: 'Marca' }
  ];

  stockFields: { key: string; label: string }[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripcion' }
  ];


  categoryCustomParams = { size: 5 };


  articlesColumns = ['Nombre', 'Cantidad', 'Precio','Marca'];
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

  refreshBHandler(component : CardGetStockComponent<any> ) {
    component.refresh(); // Llama al método de refresco en Componente B
  }
}
