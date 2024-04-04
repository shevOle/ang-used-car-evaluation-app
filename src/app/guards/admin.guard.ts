import { inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const currentUser = inject(AuthService).currentUserValue;

  if (currentUser?.isAdmin) return true;

  inject(Router).navigate(['/']);
  return false;
};
