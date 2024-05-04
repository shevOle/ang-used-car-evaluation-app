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

  async updateUser(input: IUpdateUserInput) {
    const updateUrl = `${this.url}/${input.id}`;
    const update = Object.assign({}, input) as any;
    delete update.id;

    const observable = this.httpClient.put(updateUrl, update);

    const user = (await firstValueFrom(observable)) as IUser;
    this.authService.saveUser(user);
  }
}
