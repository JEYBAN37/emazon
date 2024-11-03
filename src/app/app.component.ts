import { Component, OnInit } from '@angular/core';
 // Importa el HttpClientModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'emazon';
 
  constructor(){
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
