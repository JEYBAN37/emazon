import { Component, forwardRef, Input } from '@angular/core';
import {  FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control!: FormControl; 
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() errorMessages: { key: string, message: string }[] = []; // Mensajes de error
}
