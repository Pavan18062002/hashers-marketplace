import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  item: any = null;
  @Input() currentItem: any = null; // Input for receiving the item from the parent
  @Output() updatedItem = new EventEmitter<any>();
  editedItem: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    console.log('Navigation object:', navigation);
    if (navigation?.extras.state?.['item']) { 
      this.item = navigation.extras.state['item']; 
      this.editedItem = { ...this.item }; 
      console.log('Item received for editing:', this.editedItem); 
    } else {
      console.log('No item data received. Check navigation state.');
    }
  }

  updateItem() {
    if (this.editedItem) {
      this.updatedItem.emit(this.editedItem); // Emit the updated item
    }
  }
}
