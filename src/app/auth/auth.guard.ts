import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthService, private router:Router, private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userAuthService.getToken()) {
      const roles = route.data['roles'] as Array<string>
      if (roles) {
        const isMatch = this.userService.roleMatch(roles)
        if (isMatch) {
          return true;
        }
        this.router.navigate(['/forbidden'])
        return false
      }
    }
    this.router.navigate(['/login'])
    return false;
  }
  
}
