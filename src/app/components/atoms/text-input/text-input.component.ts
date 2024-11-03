import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  @Input() control!: FormControl;
  @Input() row !: string // Recibe el control directamente
  @Input() label!: string;
  @Input() errorMessages: { key: string, message: string }[] = []; // Mensajes de error
}
