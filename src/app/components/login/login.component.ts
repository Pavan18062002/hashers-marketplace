import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true, // ✅ Standalone component
    imports: [CommonModule, FormsModule, RouterModule], // ✅ Import FormsModule here
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return; // Stop if form is invalid
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser.email === this.email && storedUser.password === this.password) {
      this.successMessage = 'Login successful! Redirecting...';
      this.errorMessage = '';

      // ✅ Show success message for 2 seconds before redirecting
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.errorMessage = 'Invalid email or password';
      this.successMessage = '';
    }
  }
}
