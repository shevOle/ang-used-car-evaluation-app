import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IUserLoginInput } from '../interfaces/login-input';
import { IUserSignUpInput } from '../interfaces/signup-input';
import { IUser } from '../interfaces/user';
import { apiUrl } from '../helpers/constants';

const getToken = (cookieString: string) =>
  Object.fromEntries(cookieString.split('; ').map((v) => v.split('='))).token;

const getPayload = (token: string) => JSON.parse(atob(token.split('.')[1]));

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected url: string = `${apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<IUser | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject({});
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    if (
      this.currentUserSubject.value &&
      this.currentUserSubject.value.exp * 1000 < Date.now()
    ) {
      this.currentUserSubject.next(null);
    }
    return this.currentUserSubject.value;
  }

  async loginUser(data: IUserLoginInput) {
    try {
      await firstValueFrom(
        this.httpClient.post(`${this.url}/login`, data, {
          withCredentials: true,
          observe: 'events',
        })
      );
      this.saveUser();

      const { queryParams } = this.router.parseUrl(
        this.router.routerState.snapshot.url
      );

      this.router.navigate([queryParams['returnUrl'] || '/']);
    } catch (err) {
      console.error(err);
    }
  }

  saveUser() {
    const token = getToken(document.cookie);
    const userInfo = getPayload(token);

    if (userInfo && userInfo.exp * 1000 < Date.now()) {
      this.currentUserSubject.next(null);
    }

    this.currentUserSubject.next(userInfo);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  signUp(input: IUserSignUpInput) {
    const userData = {
      ...input,
      isAdmin: false,
    };
    return this.httpClient.post(`${this.url}/signup`, userData);
  }
}
