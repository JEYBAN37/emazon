import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control!: FormControl; // Recibe el control directamente
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() errorMessages: { key: string, message: string }[] = []; // Mensajes de error
}
