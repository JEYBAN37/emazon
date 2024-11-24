import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.css']
})
export class StatsBarComponent implements OnInit {
  @Input() id !: number; // Título de la barra
  @Input() percentage: number = 0; // Valor que controla el ancho de la barra
  @Input() barColor: string = '#4caf50'; // Color de la barra (opcional)
  height: string ='30'; // Altura de la barra (opcional)

  constructor() {}

  ngOnInit(): void {}
}
