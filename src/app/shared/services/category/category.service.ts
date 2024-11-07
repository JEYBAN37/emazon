import { Injectable } from '@angular/core';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Category } from '../../models/category-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiFactory: ApiFactoryService) {}
  private apiUrl = 'http://localhost:8086/admin/category/';
  fetchCategoryData(category: Category): Observable<Category> {
    return this.apiFactory.createPost<Category>(this.apiUrl, category);
  }
}
