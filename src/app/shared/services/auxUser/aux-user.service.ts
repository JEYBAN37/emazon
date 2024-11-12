import { Injectable } from '@angular/core';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { UserAux } from '../../models/aux-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxUserService {
  private apiUrl = 'http://localhost:8086/admin/register/aux_bodega';

  constructor(private apiFactory: ApiFactoryService) {}

  fetchUserAuxData(userAux: UserAux): Observable<UserAux> {
    return this.apiFactory.createPost<UserAux>(this.apiUrl, userAux);
  }
}
