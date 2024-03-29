import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "src/environments/environments";
import { User } from "../interfaces/user.interface";
import { Observable, asyncScheduler, catchError, map, of, scheduled, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl: string = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser(): User | undefined {
        if (!this.user) return undefined;
        return structuredClone(this.user);
    }

    login(user: string, password: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                tap(user => localStorage.setItem('token', 'assin823-asdk3230i232-akdsaomsdlm'))
            );
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }

    checkAuthentication(): Observable<boolean> {
        if (!localStorage.getItem('token')) return scheduled([false], asyncScheduler);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                map(user => !!user),
                catchError(error => scheduled([false], asyncScheduler))
            );
    }

}