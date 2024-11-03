import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-user-aux',
  templateUrl: './card-user-aux.component.html',
  styleUrls: ['./card-user-aux.component.scss']
})
export class CardUserAuxComponent implements OnInit {
  public userAuxForm !: FormGroup
  constructor(private fromBuilder : FormBuilder) {
    this.userAuxForm = this.fromBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      lastName:['',[Validators.required, Validators.maxLength(90)]],
      dni:['',Validators.required,Validators.maxLength(18)],
      telephone:['',Validators.required,Validators.maxLength(13)],
      dateAge:['',Validators.required,this.dateValidator],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required,Validators.minLength(6),Validators.maxLength(50)]
    })
   }

  ngOnInit(): void {
  }

  private dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Check if the value is a valid date
    const dateValue = new Date(control.value);
    if (isNaN(dateValue.getTime())) {
      return { invalidDate: true }; // return error if invalid
    }
    return null; // return null if valid
  }

  send(){
    if (this.userAuxForm.invalid) {
      // Mark all controls as touched to show validation messages
      this.userAuxForm.markAllAsTouched();
      return;
    }
    
    // If form is valid, proceed with form submission logic
    console.log('Form submitted:', this.userAuxForm.value);
  }

  nameControl(variable:string): FormControl {
    return this.userAuxForm.get(variable) as FormControl;
  }

}
