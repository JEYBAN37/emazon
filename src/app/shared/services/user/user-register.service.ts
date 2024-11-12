import { Injectable } from '@angular/core';
import { UserAux } from '../../models/aux-interface';
import { Observable } from 'rxjs';
import { ApiFactoryService } from '../factory-api/api-factory.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  private apiUrl = 'http://localhost:8088/public/register/client';

  constructor(private apiFactory: ApiFactoryService) {}

  fetchUserData(user: UserAux): Observable<UserAux> {
    return this.apiFactory.createPost<UserAux>(this.apiUrl, user);
  }
}
