import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  public articleForm !: FormGroup
  constructor(private fromBuilder : FormBuilder) {
    this.articleForm = this.fromBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      quantity:['',Validators.required],
      brand:['',Validators.required],
      articleCategories:[[],Validators.required]
    })

   }
  ngOnInit(): void {}

  send() {
    if (this.articleForm.invalid) {
      // Mark all controls as touched to show validation messages
      this.articleForm.markAllAsTouched();
      return;
    }

    
    // If form is valid, proceed with form submission logic
    console.log('Form submitted:', this.articleForm.value);
  }

  nameControl(variable:string): FormControl {
    return this.articleForm.get(variable) as FormControl;
  }

}
