import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  newItem = { name: '', description: '', price: 0, image: '' };

  @Output() itemAdded = new EventEmitter<any>();

  constructor() {}

  addItem() {
    if (this.newItem.name && this.newItem.price) {
      // Emit the new item to the parent component (DashboardComponent)
      this.itemAdded.emit(this.newItem);
      this.newItem = { name: '', description: '', price: 0, image: '' }; // Clear form after submission
    }
  }
}
