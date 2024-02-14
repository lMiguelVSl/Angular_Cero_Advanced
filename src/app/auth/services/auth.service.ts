import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "src/environments/environments";
import { User } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl: string = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }
}