import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tabs = [
    { label: 'Categorias', component: 'CategoryForm' },
    { label: 'Marcas', component: 'ArticleForm' },
    { label: 'Articulos', component: 'BrandForm' },
    { label: 'Usuarios', component: 'UserForm' }
  ];

  selectedTab = 0;

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
