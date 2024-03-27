import { Injectable } from '@angular/core';
import { IUserLoginInput } from '../interfaces/login-input';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  loginUser(input: IUserLoginInput) {
    console.log('logged in');
  }
}
