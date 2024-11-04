import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from './article-service';

export interface ObjectStock {
    name: string;
    description: string;
    quantity?:number;
    price?:number;
    brand?:Brand;
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


