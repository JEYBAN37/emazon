import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo5MSwic3ViIjoiamV5c3NzQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwOTIwNjM2LCJleHAiOjE3MzEwMDcwMzZ9.DeZJra5al1wBnKQkE8NuIuIxNhWpes8Vqx9fQFBnN9E';
    
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    // Si no hay token, se pasa la solicitud tal cual
    return next.handle(req);
  }
}
