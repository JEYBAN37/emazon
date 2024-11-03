import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h1',
  templateUrl: './h1.component.html',
  styleUrls: ['./h1.component.scss']
})
export class H1Component {
  @Input() text: string = 'Default Heading'; // Texto del encabezado
  @Input() color: string = '#000'; // Color del texto, por defecto negro
  @Input() size: 'small' | 'medium' | 'large' = 'large'; // Tamaño del encabezado
}
