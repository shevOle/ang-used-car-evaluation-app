import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUpdateUserInput } from '../interfaces/updateUser-input';
import { apiUrl } from '../helpers/constants';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected url: string = `${apiUrl}/users`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  async getUserById(id: number): Promise<IUser> {
    const params = new HttpParams({ fromObject: { id } });
    const observable = this.httpClient.get(this.url, {
      params,
    });

    const user = ((await firstValueFrom(observable)) as IUser[])[0];
    return user;
  }

  async getUserByCredentials(email: string, password: string): Promise<IUser> {
    const params = new HttpParams({ fromObject: { email, password } });
    const observable = this.httpClient.get(this.url, {
      params,
    });

    const user = ((await firstValueFrom(observable)) as IUser[])[0];
    return user;
  }

  updateUser(input: IUpdateUserInput) {
    const updateUrl = `${this.url}/${input.id}`;
    const update = Object.assign({}, input) as any;
    delete update.id;

    return this.httpClient.put(updateUrl, update).subscribe(console.log);
  }
}
