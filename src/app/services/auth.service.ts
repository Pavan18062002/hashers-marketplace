import { Injectable } from '@angular/core';

interface CustomStorage extends Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  register(user: { email: string; password: string }) {
    (localStorage as CustomStorage).setItem(user.email, JSON.stringify(user));
    return true;
  }

  login(email: string, password: string) {
    const userData = (localStorage as CustomStorage).getItem(email);
    if (!userData) return false;

    const user = JSON.parse(userData);
    return user.password === password;
  }
}
