import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnChanges {
  @Input() item: any = null; // Input for receiving the item from the parent

  @Output() updatedItem = new EventEmitter<any>(); // Output for emitting the updated item

  editedItem: any = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue) {
      this.editedItem = { ...changes['item'].currentValue };
    }
  }

  // Function to update the item and send it back to the parent
  updateItem() {
    if (this.editedItem) {
      this.updatedItem.emit(this.editedItem); // Emit the updated item
    }
  }
}
