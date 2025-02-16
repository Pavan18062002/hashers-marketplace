import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  isPurchased: boolean;
  image: string;
}

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.component.html',
  styleUrls: ['./purchase-success.component.css']
})
export class PurchaseSuccessComponent implements OnInit {
  item: Item | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { item: Item };
    if (state?.item) {
      this.item = state.item;
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
