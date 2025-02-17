import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { FormsModule } from '@angular/forms'; 

interface CustomStorage extends Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AddItemComponent, EditItemComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  items: any[] = JSON.parse(
    (localStorage as CustomStorage).getItem('items') || '[]'
  );
  selectedItem: any = null;
  selectedIndex: number = -1;

  // Search and sorting filters
  searchTerm: string = ''; // For search functionality
  sortOrder: string = 'asc'; // For sorting: 'asc' or 'desc'
  sortField: string = 'name'; // For sorting by name or price

  constructor(private router: Router) {}

  logout() {
    (localStorage as CustomStorage).removeItem('user');
    this.router.navigate(['/login']);
  }

  addItem(newItem: any) {
    this.items.push(newItem);
    (localStorage as CustomStorage).setItem(
      'items',
      JSON.stringify(this.items)
    );
  }

  editItem(index: number) {
    this.selectedItem = this.items[index];
    console.log("Selected item for editing:", this.selectedItem)
    this.router.navigate(['/edit-item'], {
      state: { item: this.selectedItem },
    });
  }

  updateItem(updatedItem: any) {
    if (this.selectedIndex !== -1) {
      this.items[this.selectedIndex] = updatedItem;
      (localStorage as CustomStorage).setItem(
        'items',
        JSON.stringify(this.items)
      );
      this.selectedItem = null;
      this.selectedIndex = -1;
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    (localStorage as CustomStorage).setItem(
      'items',
      JSON.stringify(this.items)
    );
    if (this.selectedIndex === index) {
      this.selectedItem = null;
      this.selectedIndex = -1;
    }
  }

  // Mark item as purchased
  buyItem(index: number) {
    const item = this.items[index];
    item.isPurchased = false;  // Initially marking the item as not purchased
    (localStorage as CustomStorage).setItem('items', JSON.stringify(this.items));
  
    // Navigate to the TransactionComponent and pass the selected item
    this.router.navigate(['/transaction'], {
      state: { item: item }  // Passing item to the TransactionComponent via state
    });
  }

  // Filter items based on search term
  get filteredItems() {
    return this.items.filter((item) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  // Sort the items based on selected field and order
  sortItems() {
    this.items = this.items.sort((a, b) => {
      if (this.sortField === 'name') {
        return this.sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (this.sortField === 'price') {
        return this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  }

  // Toggle sorting order and apply sorting
  toggleSortOrder(field: string) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortItems();
  }
}
