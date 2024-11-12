import { Injectable } from '@angular/core';
import { ApiFactoryService } from '../factory-api/api-factory.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private apiFactory : ApiFactoryService) {}

  fetchUserData(user: any) {
    return this.apiFactory.createPost('http://localhost:8088/public/login', user);
  }
}
