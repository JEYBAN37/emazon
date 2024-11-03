import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/services/category-service';

@Component({
  selector: 'app-card-get-categories',
  templateUrl: './card-get-categories.component.html',
  styleUrls: ['./card-get-categories.component.scss']
})
export class CardGetCategoriesComponent implements OnInit {

  categories: Category[] = [
    { name: 'Categoría 1', description: 'Descripción 1' },
    { name: 'Categoría 2', description: 'Descripción 2' },
    { name: 'Categoría 3', description: 'Descripción 3' },
    { name: 'Categoría 4', description: 'Descripción 4' },
    { name: 'Categoría 5', description: 'Descripción 5' },
    { name: 'Categoría 6', description: 'Descripción 6' },
    { name: 'Categoría 7', description: 'Descripción 7' },
    // Agrega más categorías si es necesario
];

constructor() { }

ngOnInit(): void { }

onSubmit(): void {
    console.log('Formulario enviado', this.categories);
}
}
