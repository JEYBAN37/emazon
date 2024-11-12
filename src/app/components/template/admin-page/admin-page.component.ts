import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  menuLinks = [
    { route: '/productos', name: 'Estadísticas' },
    { route: '/servicios', name: 'Perfil' },
    { route: '/', name: 'Cerrar Sesión' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
