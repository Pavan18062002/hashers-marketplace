import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../shared/transaction.service';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  isPurchased: boolean;
  image: string;
}

interface NavigationState {
  item: Item; // item is an object of type Item
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  item: Item | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as NavigationState;
    if (state?.item) {
      this.item = state.item;
    } else {
      this.error = 'Item not found. Redirecting to dashboard...';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 50000); 
    }
  }

  confirmPurchase() {
    // Directly navigate to purchase-success page without checking for item
    this.router.navigate(['/purchase-success']);
  }

//   async confirmPurchase() {
//     if (this.item) {
//       this.loading = true;
//       try {
//         // Assuming purchaseItem might be an async operation
//         await this.transactionService.purchaseItem(this.item);

//         // Navigate to purchase success page
//         this.router.navigate(['/purchase-success']); // Navigate to the success page
//       } catch (err) {
//         this.error = 'Purchase failed. Please try again later.';
//       } finally {
//         this.loading = false;
//       }
//     }
//   }

  cancelPurchase() {
    this.router.navigate(['/dashboard']);
  }
}
