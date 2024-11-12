import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-store',
  templateUrl: './page-store.component.html',
  styleUrls: ['./page-store.component.scss']
})
export class PageStoreComponent implements OnInit {
  menuLinks = [
    { route: '/car', name: 'Carrito' },
    { route: '/servicios', name: 'Perfil' },
    { route: '/', name: 'Cerrar Sesión' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
