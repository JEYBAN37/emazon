import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-emploiment',
  templateUrl: './page-emploiment.component.html',
  styleUrls: ['./page-emploiment.component.scss']
})
export class PageEmploimentComponent implements OnInit {
  menuLinks = [
    { route: '/productos', name: 'Estadísticas' },
    { route: '/servicios', name: 'Perfil' },
    { route: '/', name: 'Cerrar Sesión' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
