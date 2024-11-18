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

  public fetchUser(user: User): Observable<any> {
    return this.apiFactory.createPost<any>(this.apiUrl, user);
  }
}
