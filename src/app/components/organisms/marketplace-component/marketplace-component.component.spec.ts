import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketplaceComponent } from './marketplace-component.component';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { of, throwError } from 'rxjs';
import { ArticleJson, BrandJson, CategoryJson } from 'src/app/shared/models/article-json';

jest.mock('src/app/shared/services/factory-api/api-factory.service');
jest.mock('src/app/shared/services/alerts-services/alert-message.service');

describe('MarketplaceComponent', () => {
  let component: MarketplaceComponent;
  let fixture: ComponentFixture<MarketplaceComponent>;
  let apiFactoryService: ApiFactoryService;
  let alertService: AlertMessageService;

  beforeEach(async () => {
    apiFactoryService = new ApiFactoryService(null as any); // Mock constructor
    alertService = new AlertMessageService();

    await TestBed.configureTestingModule({
      declarations: [MarketplaceComponent],
      providers: [
        { provide: ApiFactoryService, useValue: apiFactoryService },
        { provide: AlertMessageService, useValue: alertService }
      ]
    }).compileComponents();
  });
});
