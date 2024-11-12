import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  constructor() { }
  @Input() placeholder : string = 'Buscar...';
  searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<string>(); 


  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.searchEvent.emit(this.searchTerm);
  }

  ngOnInit(): void {
  }

}
