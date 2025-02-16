import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

interface CustomStorage extends Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AddItemComponent, EditItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  items: any[] = JSON.parse(localStorage.getItem('items') || '[]');
  selectedItem: any = null;

  constructor(private router: Router) {}

  logout() {
    (localStorage as CustomStorage).removeItem('user');
    this.router.navigate(['/login']);
  }

  // Add new item to the list and save to localStorage
  addItem(newItem: any) {
    this.items.push(newItem);
    (localStorage as CustomStorage).setItem('items', JSON.stringify(this.items));
  }

  // Edit selected item
  editItem(index: number) {
    this.selectedItem = { ...this.items[index], index }; // Pass the item to edit
  }

  // Update the edited item
  updateItem(updatedItem: any) {
    if (updatedItem.index !== undefined) {
      this.items[updatedItem.index] = updatedItem;
      (localStorage as CustomStorage).setItem('items', JSON.stringify(this.items));
      this.selectedItem = null;
    }
  }

  // Delete an item
  deleteItem(index: number) {
    this.items.splice(index, 1);
    (localStorage as CustomStorage).setItem('items', JSON.stringify(this.items));
    if (this.selectedItem?.index === index) {
      this.selectedItem = null;
    }
  }

  // Mark item as purchased
  buyItem(index: number) {
    const item = this.items[index];
    item.isPurchased = true;
    (localStorage as CustomStorage).setItem('items', JSON.stringify(this.items));
  }
}
