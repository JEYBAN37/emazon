import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Método para obtener el token (puedes almacenarlo en LocalStorage o donde prefieras)
  getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }

  // Método para guardar el token (opcional)
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Método para eliminar el token (opcional)
  clearToken(): void {
    localStorage.removeItem('auth_token');
  }
}
