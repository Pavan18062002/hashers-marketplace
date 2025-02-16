import { Injectable } from '@angular/core';

// Define an interface for item
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  isPurchased: boolean;
  image: string;
}

// Define CustomStorage to extend the native Storage interface
interface CustomStorage extends Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  // Method to handle the purchase logic
  purchaseItem(item: Item) {
    const items: Item[] = JSON.parse((localStorage as CustomStorage).getItem('items') || '[]');
    
    // Update the item status to 'purchased'
    const updatedItems = items.map((i: Item) => 
      i.id === item.id ? { ...i, isPurchased: true } : i
    );
    
    // Save updated items back to localStorage
    (localStorage as CustomStorage).setItem('items', JSON.stringify(updatedItems));
  }
}
