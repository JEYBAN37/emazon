import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ObjectStock {
    name: string;
    description: string;
  }

export interface ObjectServiceInterface {
    create(object: ObjectStock): Observable<ObjectStock>;
  }


