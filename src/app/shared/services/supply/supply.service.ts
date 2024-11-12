import { Injectable } from '@angular/core';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Observable } from 'rxjs';
import { Supply } from '../../models/supply-interface';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  private apiUrl = 'http://localhost:8091/company/addSupply/';
  constructor(private apiFactory: ApiFactoryService) {}

  fetchSupplyData(supply: Supply[]): Observable<Supply[]> {
    return this.apiFactory.createPost<Supply[]>(this.apiUrl, supply);
  }
}
