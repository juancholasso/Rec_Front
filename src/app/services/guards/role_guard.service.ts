import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuardService } from './auth_guard.service';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(public auth: AuthGuardService, public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;
        console.log(expectedRole)
        var roles = JSON.parse(localStorage.getItem('roles'));
        for(let role of roles){
            if(role == expectedRole || role == "super_admin"){
                return true;
            }
        }
        return false;
    }
}