import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetBuyComponent } from './tarjet-buy.component';

describe('TarjetBuyComponent', () => {
  let component: TarjetBuyComponent;
  let fixture: ComponentFixture<TarjetBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetBuyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items with default values', () => {
    expect(component.items).toEqual([
      { id: 1, name: 'Camiseta', price: 20, quantity: 2 },
      { id: 2, name: 'Pantalón', price: 40, quantity: 1 },
      { id: 3, name: 'Zapatos', price: 60, quantity: 1 },
    ]);
  });

  describe('updateQuantity', () => {
    it('should update the quantity of an item if it exists and new quantity is valid', () => {
      component.updateQuantity(1, 3);
      const item = component.items.find(i => i.id === 1);
      expect(item?.quantity).toBe(3);
    });

    it('should not update the quantity if new quantity is negative', () => {
      component.updateQuantity(1, -1);
      const item = component.items.find(i => i.id === 1);
      expect(item?.quantity).toBe(2); // initial quantity remains unchanged
    });

    it('should not update quantity if the item does not exist', () => {
      component.updateQuantity(99, 5);
      expect(component.items.length).toBe(3); // no change in items array
    });
  });

  describe('removeItem', () => {
    it('should remove the item with the specified id', () => {
      component.removeItem(1);
      const item = component.items.find(i => i.id === 1);
      expect(item).toBeUndefined(); // item with id 1 should be removed
      expect(component.items.length).toBe(2); // items count should decrease
    });

    it('should not change items array if the item with the given id does not exist', () => {
      component.removeItem(99);
      expect(component.items.length).toBe(3); // items array remains unchanged
    });
  });

  describe('total', () => {
    it('should calculate the correct total price of all items', () => {
      const expectedTotal = (20 * 2) + (40 * 1) + (60 * 1); // 160
      expect(component.total).toBe(expectedTotal);
    });

    it('should return 0 if there are no items', () => {
      component.items = [];
      expect(component.total).toBe(0);
    });
  });
});
