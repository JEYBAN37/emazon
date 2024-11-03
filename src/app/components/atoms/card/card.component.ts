import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string = 'Título de la Tarjeta'; // Título de la tarjeta
  @Input() content: string = 'Contenido de la tarjeta. Aquí puedes agregar cualquier información adicional.'; // Contenido
  @Input() imageUrl: string = ''; // URL de la imagen
  @Input() buttonText: string = 'Acción'; // Texto del botón
}
