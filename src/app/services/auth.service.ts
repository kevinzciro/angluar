import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { switchMap, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { TokenService } from "../services/token.service";
import { addToken } from "../interceptors/token.interceptor";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `${environment.API_URL}/api/auth`;

  private userObs = new BehaviorSubject<User | null>(null);
  userObs$ = this.userObs.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password: string){
    return this.http.post<Auth>(`${this.apiURL}/login`, {email, password, context: addToken()})
    .pipe(
      tap( response => this.tokenService.saveToken(response.access_token) )
    );
  }

  loginAndGetProfile(email:string, password: string){
    return this.login(email, password)
      .pipe(
        switchMap( () => this.profile()),

      )
  }

  profile(){
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiURL}/profile`)
    .pipe(
      tap( user => {
        this.userObs.next(user);
      })
    );
    // , {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // 'Content-type': 'application/json',
    //   }}
  }

  logout(){
    this.tokenService.removeToken();
  }
}
