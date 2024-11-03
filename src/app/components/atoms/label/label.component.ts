import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  @Input() forId: string = ''; // ID al que la etiqueta está asociada
  @Input() label: string = ''; // Texto de la etiqueta
  constructor() { }

  ngOnInit(): void {
  }

}
