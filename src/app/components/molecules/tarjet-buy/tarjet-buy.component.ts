import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjet-buy',
  templateUrl: './tarjet-buy.component.html',
  styleUrls: ['./tarjet-buy.component.scss']
})
export class TarjetBuyComponent implements OnInit {
  items = [
    { id: 1, name: 'Camiseta', price: 20, quantity: 2 },
    { id: 2, name: 'Pantalón', price: 40, quantity: 1 },
    { id: 3, name: 'Zapatos', price: 60, quantity: 1 },
  ];

  updateQuantity(id: number, newQuantity: number): void {
    if (newQuantity >= 0) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity = newQuantity;
      }
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
