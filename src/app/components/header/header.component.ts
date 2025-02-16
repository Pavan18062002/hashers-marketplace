import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
export interface CustomStorage extends Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    // Listen to route changes to update login status dynamically
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus() {
    const userExists = !!localStorage.getItem('user'); 
    const isOnLoginPage = this.router.url.includes('/login'); 
    const isOnRegisterPage = this.router.url.includes('/register'); 
    this.isLoggedIn = userExists && !isOnRegisterPage && !isOnLoginPage;
  }

  logout() {
    (localStorage as CustomStorage).removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
