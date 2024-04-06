import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IUserLoginInput } from '../interfaces/login-input';
import { IUserSignUpInput } from '../interfaces/signup-input';
import { IUser } from '../interfaces/user';
import { apiUrl } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected url: string = `${apiUrl}/users`;
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  async loginUser({ email, password }: IUserLoginInput) {
    try {
      const params = new HttpParams({ fromObject: { email, password } });
      const observable = this.httpClient.get(this.url, {
        params,
      });

      const user = ((await firstValueFrom(observable)) as IUser[])[0];
      if (!user) throw new Error('Incorrect login or password');
      const userObject: Partial<IUser> = { ...user };
      delete userObject.password;

      localStorage.setItem('currentUser', JSON.stringify(userObject));
      this.currentUserSubject.next(user);

      const { queryParams } = this.router.parseUrl(
        this.router.routerState.snapshot.url
      );

      this.router.navigate([queryParams['returnUrl'] || '/']);
    } catch (err) {
      console.error(err);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  signUp(input: IUserSignUpInput) {
    console.log('signed up');
  }
}
