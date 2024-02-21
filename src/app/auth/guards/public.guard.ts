import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication()
            .pipe(
                tap(isAuthenticated => {
                    if (isAuthenticated) this.router.navigate(['/heroes'])
                }),
            map(isAuthenticated => !isAuthenticated)
            )
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('Can Activate public guard');
        console.log({ route, state });

        return this.checkAuthStatus();
    }

}