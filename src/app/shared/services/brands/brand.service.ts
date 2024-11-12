import { Injectable } from '@angular/core';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { Observable } from 'rxjs';
import { Brand } from '../../models/brand-interface';



@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:8086/admin/brands/';

  constructor(private apiFactory: ApiFactoryService) {}

  fetchBrandData(brand: Brand): Observable<Brand> {
    return this.apiFactory.createPost<Brand>(this.apiUrl, brand);
  }
}
