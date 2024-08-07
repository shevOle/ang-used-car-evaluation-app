import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUpdateUserInput } from '../interfaces/updateUser-input';
import { apiUrl } from '../helpers/constants';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected url: string = `${apiUrl}/users`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  async updateUser(input: IUpdateUserInput) {
    try {
      this.loadingService.loadingOn();
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

      this.toastr.success('User was successfully updated!');
    } finally {
      this.loadingService.loadingOff();
    }
  }
}
