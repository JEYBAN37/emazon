import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit  {
  selectedUser!: string;
  title !: string;
  subtitle !: string ;
  userSelected !: string;
  employee !: string;
  client !: string;
  admin!: string;


  constructor(private router: Router) { 

  }

  ngOnInit(): void {
    this.title = '¿Quieres Iniciar Sesion?';
    this.subtitle = 'Selecciona el tipo de usuario en Emazon';
    this.userSelected = 'Selecciona tu usuario';
    this.employee = 'Empleado';
    this.client = 'Cliente';
    this.admin = 'Admin';
  }

  selectUser(type: string): void {
    this.selectedUser = type;
  }

  toRegister() {
    this.router.navigate(['/register']);
  }
   
  }
