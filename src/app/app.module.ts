import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Import Standalone Components
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Import Services
import { TransactionService } from './components/shared/transaction.service';
import { PurchaseSuccessComponent } from './components/purchaseSuccess/purchase-success.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';

@NgModule({
  imports: [
    // Import other required modules
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TransactionComponent,
    PurchaseSuccessComponent,  // Importing TransactionComponent
    DashboardComponent,
    EditItemComponent,
    
  ],
  providers: [
    // Provide services used in this module
    TransactionService,
    provideHttpClient()
  ],
})
export class AppModule {}
