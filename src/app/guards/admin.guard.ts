import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); 
  const router = inject(Router); 
  const user: any = userService.getUser(); 
  return user?.admin ? true : router.navigate(['/login']);
};
