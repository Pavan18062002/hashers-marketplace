import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true, 
    imports: [CommonModule, FormsModule], 
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) {}
  
  register(form: NgForm) {
    if (form.invalid) return; // ✅ Prevent submission if invalid
  
    // ✅ Save user data in localStorage
    localStorage.setItem('user', JSON.stringify({ email: this.email, password: this.password }));

    this.message = 'Registration successful! Redirecting to login...';
    
    setTimeout(() => {
      this.router.navigate(['/login']); // ✅ Redirect after successful registration
    }, 1500);
  }
}
