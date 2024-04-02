import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { IUserLoginInput } from '../interfaces/login-input';
import { IUserSignUpInput } from '../interfaces/signup-input';
import { IUser } from '../interfaces/user';
import { apiUrl } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  protected url: string = `${apiUrl}/users`;

  constructor(protected httpClient: HttpClient) {}

  async loginUser({ email, password }: IUserLoginInput) {
    try {
      const params = new HttpParams({ fromObject: { email, password } });
      const observable = this.httpClient.get(this.url, {
        params,
      });

      const user = ((await firstValueFrom(observable)) as IUser[])[0];
      if (!user) throw new Error('Incorrect login or password');
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }

  signUp(input: IUserSignUpInput) {
    console.log('signed up');
  }
}
