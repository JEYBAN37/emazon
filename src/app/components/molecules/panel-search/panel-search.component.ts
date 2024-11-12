import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-search',
  templateUrl: './panel-search.component.html',
  styleUrls: ['./panel-search.component.scss']
})
export class PanelSearchComponent {

  searchName: string = '';
  searchBrand: string = '';
  searchArticle: string = '';

  @Output() searchParams = new EventEmitter<{ name: string, brand: string, article: string }>();

  handleSearchName(event: string): void {
    this.searchName = event;
    this.emitSearchParams();
  }

  handleSearchBrand(event: string): void {
    this.searchBrand = event;
    this.emitSearchParams();
  }

  handleSearchArticle(event: string): void {
    this.searchArticle = event;
    this.emitSearchParams();
  }

  emitSearchParams(): void {
    this.searchParams.emit({
      name: this.searchName,
      brand: this.searchBrand,
      article: this.searchArticle
    });
  }
}
