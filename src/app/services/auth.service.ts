import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUserLoginInput } from '../interfaces/login-input';
import { IUserSignUpInput } from '../interfaces/signup-input';
import { IUser } from '../interfaces/user';
import { apiUrl } from '../helpers/constants';

const getToken = (cookieString: string) => {
  if (!cookieString) return null;

  const cookieValues = cookieString.split('; ').map((v) => v.split('='));

  return Object.fromEntries(cookieValues).token;
};

const getPayload = (token: string) => {
  if (!token) return null;

  return JSON.parse(atob(token.split('.')[1]));
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected url: string = `${apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<IUser | null>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject(null);
    this.currentUser = this.currentUserSubject.asObservable();

    this.saveUser();
  }

  saveUser() {
    const token = getToken(document.cookie);
    const userInfo = getPayload(token);

    const tokenIsExpired = userInfo && userInfo.exp * 1000 < Date.now();

    if (!userInfo || tokenIsExpired) {
      this.currentUserSubject.next(null);
    }

    this.currentUserSubject.next(userInfo);
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
    await firstValueFrom(
      this.httpClient.post(`${this.url}/login`, data, {
        withCredentials: true,
        observe: 'response',
        responseType: 'text',
      })
    );

    this.saveUser();

    const { queryParams } = this.router.parseUrl(
      this.router.routerState.snapshot.url
    );

    this.router.navigate([queryParams['returnUrl'] || '/']);

    this.toastr.success(`Welcoome, ${data.email}`);
  }

  async logout() {
    await firstValueFrom(
      this.httpClient.post(
        `${this.url}/logout`,
        {},
        {
          withCredentials: true,
          observe: 'response',
          responseType: 'text',
        }
      )
    );

    this.currentUserSubject.next(null);
  }

  async signUp(input: IUserSignUpInput) {
    const userData = {
      ...input,
      isAdmin: false,
    };

    await firstValueFrom(
      this.httpClient.post(`${this.url}/signup`, userData, {
        withCredentials: true,
        observe: 'response',
        responseType: 'text',
      })
    );

    this.saveUser();

    const { queryParams } = this.router.parseUrl(
      this.router.routerState.snapshot.url
    );

    this.router.navigate([queryParams['returnUrl'] || '/']);
    this.toastr.success(`Welcoome, ${input.email}`);
  }
}
