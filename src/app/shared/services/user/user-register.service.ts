import { Injectable } from '@angular/core';
import { UserAux } from '../../models/aux-interface';
import { Observable } from 'rxjs';
import { ApiFactoryService } from '../factory-api/api-factory.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  private apiUrl = 'http://localhost:8088/public/register/client';
  private apiUrl2 = 'http://localhost:8081/secure/createCar/';

  constructor(private apiFactory: ApiFactoryService) {}

  fetchUserData(user: UserAux): Observable<any> {
    return this.apiFactory.createPost<any>(this.apiUrl, user);
  }

  fechCreateCar() {
    return this.apiFactory.createPost<any>(this.apiUrl2,null);}
}
