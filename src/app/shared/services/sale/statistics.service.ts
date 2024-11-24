import { Injectable } from '@angular/core';
import { StatisticsJson } from '../../models/statistics-json';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private url = 'http://localhost:8091/admin/stadistics/';

  constructor(
    private apiFactory: ApiFactoryService,
  ) { }

  public getStatisticsData(): Observable<StatisticsJson> {
    return this.apiFactory.createGet<StatisticsJson>(this.url);
  }
}
