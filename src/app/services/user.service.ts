import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUpdateUserInput } from '../interfaces/updateUser-input';
import { apiUrl } from '../helpers/constants';
import { AuthService } from './auth.service';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractService {
  protected url: string = `${apiUrl}/users`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    toastr: ToastrService
  ) {
    super(toastr);
  }

  private async _updateUser(input: IUpdateUserInput) {
    const updateUrl = `${this.url}/${input.id}`;
    const update = Object.assign({}, input) as any;
    delete update.id;

    const observable = this.httpClient.patch(updateUrl, update, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text',
    });

    await firstValueFrom(observable);
    this.authService.saveUser();
  }
  updateUser(input: IUpdateUserInput) {
    return this.withNotification(
      () => this._updateUser(input),
      'Data was successfully updated'
    );
  }
}
