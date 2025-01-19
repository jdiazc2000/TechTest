import { Injectable } from '@angular/core';
import { User } from '../../core/models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private users: User[] = this.getUsersFromSession();
    private userSubject = new BehaviorSubject<User[]>(this.users);
    users$ = this.userSubject.asObservable();
  
    private getUsersFromSession(): User[] {
      const storedUsers = sessionStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : [];
    }
  
    private saveUsersToSession() {
      sessionStorage.setItem('users', JSON.stringify(this.users));
    }
  
    addUser(user: User) {
      user.id = this.users.length + 1;
      this.users.push(user);
      this.saveUsersToSession();
      this.userSubject.next(this.users);
    }
  
    deleteUser(id: number) {
      this.users = this.users.filter(u => u.id !== id);
      this.saveUsersToSession();
      this.userSubject.next(this.users);
    }
  }