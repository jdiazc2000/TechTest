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
      const storedUsers = localStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : [];
    }
  
    private saveUsersToSession() {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  
    getUsers(){
      return this.users;
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

    editUser(id: number, updatedUser: Partial<User>) {
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
        this.saveUsersToSession();
        this.userSubject.next(this.users);
      }
    }

    getUser(): User[] {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : [];
    }

    getUserById(id: number): User | undefined {
      return this.users.find(user => user.id === id);
    }

    getUserByUsernameAndPassword(username: string, password: string): User | undefined {
      return this.users.find(user => user.username === username && user.password === password);
    }
  }