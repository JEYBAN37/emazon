import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleJson } from 'src/app/shared/models/article-json';
import { CardGetStockComponent } from '../../molecules/card-get-stock/card-get-stock.component';
import { Supply, SupplyDetails } from 'src/app/shared/models/supply-interface';

@Component({
  selector: 'app-panel-supply',
  templateUrl: './panel-supply.component.html',
  styleUrls: ['./panel-supply.component.scss']
})
export class PanelSupplyComponent {
  @ViewChild('componenteGetArticle') getArticle!: CardGetStockComponent<any>;
  responseData!: SupplyDetails[]; // Propiedad para almacenar la respuesta completa


  onSuppliesUpdated(response:SupplyDetails[] ): void {
    this.responseData = response; // Almacena la respuesta completa
  }

  articlesClass = ArticleJson;
  supplies: Supply[] = [];
  // Parámetros personalizados
  articleCustomParams: { size: number; byName: string | null; byBrand: string | null; byCategory: string | null } = { size: 5, byName: null, byBrand: null, byCategory: null };

  apiUrlArticles = 'http://localhost:8086/secure/articles/';
  articlesColumns = ['id','Nombre', 'Cantidad', 'Precio', 'Marca','Categoria'];
  supplyColumnsToSend = ['id','Cantidad','Estado'];
  supplyColumns = ['Orden','id','Cantidad','Estado','fecha'];

  articleFields: { key: string; label: string }[] = [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'Nombre' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'price', label: 'Precio' },
    { key: 'brand.name', label: 'Marca' },
    { key: 'articleCategories.0.name', label: 'Categoria' },
  ];

  supplyFieldsToSend: { key: string; label: string }[] = [
    {key: 'idArticle', label: 'Id' },
    {key: 'quantity', label: 'Cantidad' },
    { key: 'state', label: 'Estado' },
  ];

  supplyFields: { key: string; label: string }[] = [
    {key: 'id', label: 'Orden' },
    {key: 'idArticle', label: 'id' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'state', label: 'Estado' },
    { key: 'date', label: 'Fecha' },
  ];

  constructor() { }

  tabs = [
    { label: 'Inventario de Stock', component: 'CategoryForm' },
    { label: 'Suministros', component: 'ArticleForm' },
  ];

  selectedTab = 0;

  selectTab(index: number): void {
    this.selectedTab = index;
  }



  handleSearchParams(searchParams: { name: string, brand: string, category: string }): void {
    // Desestructuramos los parámetros del evento
    const { name, brand, category } = searchParams;

    // Asignamos los valores de búsqueda a articleCustomParams
    // Si no se proporcionan valores, se asignan null
    this.articleCustomParams.byName = name;
    this.articleCustomParams.byBrand = brand ;
    this.articleCustomParams.byCategory = category ;

    // Refrescamos el componente hijo
    this.getArticle.refresh();
  }

  addSupply(supply: Supply): void {
    this.supplies.push(supply);
  }

}
