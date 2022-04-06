import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../sign-up/shared/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.getLocalStorage("currentUser")??{};
        console.log(currentUser);
        if (Object.keys(currentUser).length) {
            console.log("xxx");
            
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}