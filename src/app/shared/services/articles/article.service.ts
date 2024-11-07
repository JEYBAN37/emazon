// src/app/shared/services/article/article.service.ts
import { Injectable } from '@angular/core';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { Observable } from 'rxjs';
import { Article } from '../../models/article-interface';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8086/admin/articles/';

  constructor(private apiFactory: ApiFactoryService) {}

  fetchArticleData(article: Article): Observable<Article> {
    return this.apiFactory.createPost<Article>(this.apiUrl, article);
  }
}
