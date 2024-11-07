import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const OBJECT_SERVICE = new InjectionToken<ObjectServiceInterface>('ObjectServiceInterface');


export interface ObjectStock {
    name?: string;
    description?: string;
    quantity?:number;
    price?:number;
    brand?:string;
    articleCategories ?: number[];
    [key: string]: any;
  }

export interface ObjectServiceInterface {
    create(object: ObjectStock): Observable<ObjectStock>;
    get(page: number, 
        size: number,
        ascending:boolean,
        byBrand ?:string,
        byArticle ?: string,
        byName ?: string
      ): Observable<ObjectStock[]>
  }


