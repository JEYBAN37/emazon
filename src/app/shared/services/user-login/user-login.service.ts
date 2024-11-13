import { Injectable } from '@angular/core';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { User } from '../../models/user-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private apiUrl = 'http://localhost:8088/public/login';

  constructor(private apiFactory : ApiFactoryService) {}

  fetchUser(user: User): Observable<User> {
    return this.apiFactory.createPost<User>(this.apiUrl, user);
  }
}
