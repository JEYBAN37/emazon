import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiAiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo5Mywic3ViIjoianNnc0BleGFtcGxlLmNvbSIsImlhdCI6MTczMTM3NTU1NiwiZXhwIjoxNzMxNDYxOTU2fQ.eHR9ZHzrmsu3YsKTGMWYoku3l7LnSzQg2pSjevqe_I0';
    
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
