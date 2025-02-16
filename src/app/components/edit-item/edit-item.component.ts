import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  @Input() item: any = null; // Input for receiving the item from the parent
  @Output() updatedItem = new EventEmitter<any>(); // Output for emitting the updated item

  constructor() {}

  // Function to update the item and send it back to the parent
  updateItem() {
    if (this.item) {
      this.updatedItem.emit(this.item); // Emit the updated item
    }
  }
}
