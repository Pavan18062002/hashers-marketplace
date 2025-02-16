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
  item: Item;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  item: Item | null = null;
  loading: boolean = false;
  error: string | null = null;
  purchaseSuccess: boolean = false;

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
      }, 30000); // Redirect after 3 seconds
    }
  }

  async confirmPurchase() {
    if (this.item) {
      this.loading = true;
      this.error = null;

      try {
        await this.transactionService.purchaseItem(this.item);
        this.purchaseSuccess = true; // Show success message
      } catch (err) {
        this.error = 'Purchase failed. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  }

  cancelPurchase() {
    this.router.navigate(['/dashboard']);
  }
}