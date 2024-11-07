import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() control!: FormControl; 
  @Input() row !: string 
  @Input() label!: string;
  @Input() errorMessages: { key: string, message: string }[] = []; 

}
