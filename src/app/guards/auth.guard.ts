import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); 
  const router = inject(Router); 
  const user: any = userService.getUser(); 
  return user.length !== 0 ? true : router.navigate(['/login']);;
};
